import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const showDeleted = searchParams.get('showDeleted') === 'true'

    const where: any = {
      ...(type && type !== 'all' ? { type } : {}),
      ...(showDeleted ? {} : { status: { not: 'deleted' } }),
    }

    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const [documents, total, thisMonth, grouped] = await Promise.all([
      prisma.document.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, email: true } },
          uploadedBy: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 500,
      }),
      prisma.document.count({ where: { status: { not: 'deleted' } } }),
      prisma.document.count({ where: { createdAt: { gte: startOfMonth }, status: { not: 'deleted' } } }),
      prisma.document.groupBy({
        by: ['type'],
        where: { status: { not: 'deleted' } },
        _count: { type: true },
      }),
    ])

    const byType = grouped.reduce<Record<string, number>>((acc, item) => {
      acc[item.type] = item._count.type
      return acc
    }, {})

    return NextResponse.json(
      {
        documents,
        stats: { total, thisMonth, byType },
      },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  } catch (error) {
    console.error('Error fetching admin documents:', error)
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 })
  }
}
