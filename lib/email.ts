import nodemailer from 'nodemailer'

const smtpHost = process.env.SMTP_HOST
const smtpPort = Number(process.env.SMTP_PORT || 465)
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASSWORD
const fromEmail = process.env.SMTP_FROM || smtpUser
const notificationEmail = process.env.NOTIFICATION_EMAIL || fromEmail

const isEmailConfigured =
  Boolean(smtpHost) && Boolean(smtpUser) && Boolean(smtpPass) && Boolean(fromEmail)

const transporter = isEmailConfigured
  ? nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })
  : null

type EmailOptions = {
  subject: string
  html: string
  text: string
}

export async function sendNotificationEmail(options: EmailOptions) {
  if (!isEmailConfigured || !transporter) {
    console.warn('Email transport is not configured. Skipping email notification.')
    return
  }

  try {
    await transporter.sendMail({
      from: fromEmail,
      to: notificationEmail,
      subject: options.subject,
      text: options.text,
      html: options.html,
    })
  } catch (error) {
    console.error('Error sending notification email:', error)
  }
}

