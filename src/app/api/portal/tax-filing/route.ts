import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const taxReturn = await prisma.taxReturn.findFirst({
      where: {
        userId: session.user.id,
        year: new Date().getFullYear(),
      },
      include: {
        dependents: true,
        documents: true,
      },
    })

    return NextResponse.json({ taxReturn })
  } catch (error) {
    console.error('Error fetching tax return:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tax return' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      currentStep,
      year,
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      ssn,
      address,
      city,
      state,
      zipCode,
      filingStatus,
      wageIncome,
      interestIncome,
      dividendIncome,
      businessIncome,
      capitalGains,
      otherIncome,
      bankRouting,
      bankAccount,
      bankAccountType,
      engagementSigned,
      form8879Signed,
    } = body

    // Prepare personal info JSON
    const personalInfo = JSON.stringify({
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      ssn,
      address,
      city,
      state,
      zipCode,
    })

    // Calculate totals
    const totalIncome =
      (wageIncome || 0) +
      (interestIncome || 0) +
      (dividendIncome || 0) +
      (businessIncome || 0) +
      (capitalGains || 0) +
      (otherIncome || 0)

    // Find existing tax return or create new one
    let taxReturn = await prisma.taxReturn.findFirst({
      where: {
        userId: session.user.id,
        year: year || new Date().getFullYear(),
      },
    })

    if (taxReturn) {
      taxReturn = await prisma.taxReturn.update({
        where: { id: taxReturn.id },
        data: {
          currentStep,
          personalInfo,
          filingStatus,
          wageIncome,
          interestIncome,
          dividendIncome,
          businessIncome,
          capitalGains,
          otherIncome,
          totalIncome,
          bankRouting,
          bankAccount,
          bankAccountType,
          engagementSigned,
          engagementSignedAt: engagementSigned ? new Date() : null,
          form8879Signed,
          form8879SignedAt: form8879Signed ? new Date() : null,
        },
      })
    } else {
      taxReturn = await prisma.taxReturn.create({
        data: {
          userId: session.user.id,
          year: year || new Date().getFullYear(),
          status: 'draft',
          currentStep: currentStep || 1,
          personalInfo,
          filingStatus,
          wageIncome,
          interestIncome,
          dividendIncome,
          businessIncome,
          capitalGains,
          otherIncome,
          totalIncome,
          bankRouting,
          bankAccount,
          bankAccountType,
        },
      })
    }

    return NextResponse.json({
      success: true,
      taxReturn,
    })
  } catch (error) {
    console.error('Error saving tax return:', error)
    return NextResponse.json(
      { error: 'Failed to save tax return' },
      { status: 500 }
    )
  }
}
