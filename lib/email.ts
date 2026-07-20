import nodemailer from 'nodemailer';

interface SendEmailParams {
  name: string;
  email: string;
  message: string;
}

export interface SummitInvitationData {
  name: string;
  email: string;
  company: string;
  industryFocus: string;
  whyAttend: string;
  contribution: string;
}

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendContactEmail({ name, email, message }: SendEmailParams): Promise<boolean> {
  const transporter = getTransporter();
  const contactEmail = 'admin@heatpunks.org';

  try {
    await transporter.sendMail({
      from: 'Hashrate Heatpunks <admin@heatpunks.org>',
      to: contactEmail,
      replyTo: email,
      subject: `[Heatpunks Contact] Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `.trim(),
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
<h3>Message:</h3>
<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `.trim(),
    });

    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

export async function sendSummitInvitation(data: SummitInvitationData): Promise<boolean> {
  const transporter = getTransporter();
  const summitEmail = 'admin@heatpunks.org';

  const textContent = `
SUMMIT 2027 INVITATION REQUEST
==============================

APPLICANT INFORMATION
---------------------
Name: ${data.name}
Email: ${data.email}
Company/Organization: ${data.company}
Industry Focus: ${data.industryFocus}

WHY INTERESTED IN ATTENDING
---------------------------
${data.whyAttend}

HOW THEY CAN CONTRIBUTE
-----------------------
${data.contribution}
  `.trim();

  const htmlContent = `
<h1 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">Summit 2027 Invitation Request</h1>

<h2 style="color: #333; margin-top: 24px;">Applicant Information</h2>
<table style="border-collapse: collapse; width: 100%; max-width: 600px;">
  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(data.name)}</td></tr>
  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Company/Organization:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(data.company)}</td></tr>
  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Industry Focus:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(data.industryFocus)}</td></tr>
</table>

<h3 style="color: #666; margin-top: 24px;">Why They're Interested in Attending</h3>
<div style="background: #f9f9f9; padding: 16px; border-left: 3px solid #f97316; margin-bottom: 16px;">
${escapeHtml(data.whyAttend).replace(/\n/g, '<br>')}
</div>

<h3 style="color: #666; margin-top: 16px;">How They Can Contribute</h3>
<div style="background: #f9f9f9; padding: 16px; border-left: 3px solid #f97316; margin-bottom: 16px;">
${escapeHtml(data.contribution).replace(/\n/g, '<br>')}
</div>
  `.trim();

  try {
    await transporter.sendMail({
      from: 'Hashrate Heatpunks <admin@heatpunks.org>',
      to: summitEmail,
      replyTo: data.email,
      subject: `[Summit 2027] Invitation Request - ${data.name} (${data.company})`,
      text: textContent,
      html: htmlContent,
    });

    return true;
  } catch (error) {
    console.error('Failed to send summit invitation email:', error);
    return false;
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
