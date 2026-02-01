import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

const fromEmail = process.env.EMAIL_FROM || 'noreply@bestustax.com'
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://bestustax.com'

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"BestUSTax" <${fromEmail}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    })
    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}

// Email Templates
export function getVerificationEmailTemplate(name: string, verificationUrl: string) {
  return {
    subject: 'Verify Your Email - BestUSTax',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">BestUSTax</h1>
  </div>
  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #1e40af;">Welcome, ${name}!</h2>
    <p>Thank you for registering with BestUSTax. Please verify your email address to activate your account.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${verificationUrl}" style="background: #1e40af; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Verify Email</a>
    </div>
    <p style="color: #666; font-size: 14px;">If you didn't create an account, you can safely ignore this email.</p>
    <p style="color: #666; font-size: 14px;">This link will expire in 24 hours.</p>
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
    <p style="color: #999; font-size: 12px; text-align: center;">
      BestUSTax - Professional Tax Services<br>
      <a href="${appUrl}" style="color: #1e40af;">bestustax.com</a>
    </p>
  </div>
</body>
</html>
    `,
  }
}

export function getAppointmentConfirmationTemplate(
  name: string,
  appointmentDetails: {
    type: string
    date: string
    time: string
    location: string
  }
) {
  return {
    subject: 'Appointment Confirmation - BestUSTax',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">BestUSTax</h1>
  </div>
  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #1e40af;">Appointment Confirmed!</h2>
    <p>Dear ${name},</p>
    <p>Your appointment has been confirmed. Here are the details:</p>
    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #1e40af; margin: 20px 0;">
      <p style="margin: 8px 0;"><strong>Service:</strong> ${appointmentDetails.type}</p>
      <p style="margin: 8px 0;"><strong>Date:</strong> ${appointmentDetails.date}</p>
      <p style="margin: 8px 0;"><strong>Time:</strong> ${appointmentDetails.time}</p>
      <p style="margin: 8px 0;"><strong>Location:</strong> ${appointmentDetails.location}</p>
    </div>
    <p><strong>What to bring:</strong></p>
    <ul style="color: #666;">
      <li>Valid ID (passport or driver's license)</li>
      <li>Social Security Card or ITIN</li>
      <li>Previous year's tax return (if available)</li>
      <li>All income documents (W-2s, 1099s, etc.)</li>
    </ul>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${appUrl}/portal/client/appointments" style="background: #1e40af; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">View Appointment</a>
    </div>
    <p style="color: #666; font-size: 14px;">Need to reschedule? Please contact us at least 24 hours in advance.</p>
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
    <p style="color: #999; font-size: 12px; text-align: center;">
      BestUSTax - Professional Tax Services<br>
      Phone: (512) 555-0123 | Email: info@bestustax.com<br>
      <a href="${appUrl}" style="color: #1e40af;">bestustax.com</a>
    </p>
  </div>
</body>
</html>
    `,
  }
}

export function getAppointmentBookedTemplate(
  name: string,
  appointmentDetails: {
    type: string
    date: string
    time: string
  }
) {
  return {
    subject: 'Appointment Request Received - BestUSTax',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">BestUSTax</h1>
  </div>
  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #1e40af;">Appointment Request Received</h2>
    <p>Dear ${name},</p>
    <p>Thank you for booking an appointment with BestUSTax. We have received your request and will confirm it shortly.</p>
    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
      <p style="margin: 8px 0;"><strong>Service:</strong> ${appointmentDetails.type}</p>
      <p style="margin: 8px 0;"><strong>Requested Date:</strong> ${appointmentDetails.date}</p>
      <p style="margin: 8px 0;"><strong>Requested Time:</strong> ${appointmentDetails.time}</p>
      <p style="margin: 8px 0; color: #f59e0b;"><strong>Status:</strong> Pending Confirmation</p>
    </div>
    <p>You will receive a confirmation email once your appointment is approved.</p>
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
    <p style="color: #999; font-size: 12px; text-align: center;">
      BestUSTax - Professional Tax Services<br>
      <a href="${appUrl}" style="color: #1e40af;">bestustax.com</a>
    </p>
  </div>
</body>
</html>
    `,
  }
}

export function getAdminNotificationTemplate(
  notificationType: 'new_appointment' | 'new_registration',
  details: Record<string, string>
) {
  const title = notificationType === 'new_appointment' ? 'New Appointment Request' : 'New User Registration'

  return {
    subject: `[Admin] ${title} - BestUSTax`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #dc2626; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">Admin Notification</h1>
  </div>
  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #dc2626;">${title}</h2>
    <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
      ${Object.entries(details)
        .map(([key, value]) => `<p style="margin: 8px 0;"><strong>${key}:</strong> ${value}</p>`)
        .join('')}
    </div>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${appUrl}/portal/admin" style="background: #dc2626; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Go to Admin Portal</a>
    </div>
  </div>
</body>
</html>
    `,
  }
}

export function getPasswordResetTemplate(name: string, resetUrl: string) {
  return {
    subject: 'Password Reset - BestUSTax',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">BestUSTax</h1>
  </div>
  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #1e40af;">Password Reset Request</h2>
    <p>Dear ${name},</p>
    <p>We received a request to reset your password. Click the button below to create a new password:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetUrl}" style="background: #1e40af; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
    </div>
    <p style="color: #666; font-size: 14px;">If you didn't request a password reset, you can safely ignore this email.</p>
    <p style="color: #666; font-size: 14px;">This link will expire in 1 hour.</p>
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
    <p style="color: #999; font-size: 12px; text-align: center;">
      BestUSTax - Professional Tax Services<br>
      <a href="${appUrl}" style="color: #1e40af;">bestustax.com</a>
    </p>
  </div>
</body>
</html>
    `,
  }
}
