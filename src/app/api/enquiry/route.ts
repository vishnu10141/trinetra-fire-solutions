import { NextRequest, NextResponse } from 'next/server';
import { enquirySchema } from '@/lib/validation';
import { generateReferenceNumber } from '@/lib/reference';

// Prevent static prerendering of this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Simple in-memory rate limiting (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600000 }); // 1 hour window
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? req.headers.get('x-real-ip') ?? 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later or call us directly.' },
        { status: 429 }
      );
    }

    // Parse and validate body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid request format.' }, { status: 400 });
    }

    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please check your details and try again.',
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const data = parsed.data;
    const referenceNumber = generateReferenceNumber();
    const submittedAt = new Date().toISOString();

    // Save to DB if Prisma is available
    try {
      const { PrismaClient } = await import('@prisma/client');
      const prisma = new PrismaClient();
      await prisma.enquiry.create({
        data: {
          referenceNumber,
          fullName: data.fullName,
          companyName: data.companyName,
          designation: data.designation,
          email: data.email,
          mobile: data.mobile,
          projectLocation: data.projectLocation,
          city: data.city,
          serviceRequired: data.serviceRequired,
          productRequired: data.productRequired,
          projectDescription: data.projectDescription,
          sourcePage: data.sourcePage,
          sourceProduct: data.sourceProduct,
        },
      });
      await prisma.$disconnect();
    } catch (dbError) {
      // DB not available in dev without prisma db push — log and continue
      console.warn('[Enquiry] DB unavailable, proceeding without DB save:', dbError);
    }

    // Send emails if configured
    const emailHost = process.env.EMAIL_HOST;
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const businessEmail = process.env.BUSINESS_EMAIL;

    if (emailHost && emailUser && emailPass && emailPass !== 'your-app-password-here') {
      try {
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.default.createTransport({
          host: emailHost,
          port: parseInt(process.env.EMAIL_PORT || '587'),
          secure: false,
          auth: { user: emailUser, pass: emailPass },
        });

        // Business notification email
        if (businessEmail) {
          await transporter.sendMail({
            from: process.env.EMAIL_FROM || emailUser,
            to: businessEmail,
            subject: `New Enquiry — ${referenceNumber} — ${data.fullName}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; background: #0e0e0e; color: #f5f0e8; padding: 32px; border-radius: 12px;">
                <h2 style="color: #C41E3A; font-size: 20px; margin-bottom: 4px;">NEW ENQUIRY RECEIVED</h2>
                <p style="color: #888; font-size: 13px; margin-bottom: 24px; font-family: monospace;">Reference: ${referenceNumber}</p>
                <table style="width: 100%; border-collapse: collapse;">
                  ${[
                    ['Name', data.fullName],
                    ['Company', data.companyName || '—'],
                    ['Designation', data.designation || '—'],
                    ['Email', data.email],
                    ['Mobile', data.mobile],
                    ['City', data.city || '—'],
                    ['Project Location', data.projectLocation || '—'],
                    ['Service Required', data.serviceRequired || '—'],
                    ['Product Required', data.productRequired || '—'],
                  ].map(([k, v]) => `
                    <tr>
                      <td style="padding: 8px 12px; background: #1a1a1a; color: #888; font-size: 12px; border-radius: 4px;">${k}</td>
                      <td style="padding: 8px 12px; color: #f5f0e8; font-size: 13px;">${v}</td>
                    </tr>
                  `).join('')}
                </table>
                ${data.projectDescription ? `<div style="margin-top: 16px; padding: 16px; background: #1a1a1a; border-radius: 8px; color: #aaa; font-size: 13px; line-height: 1.6;">${data.projectDescription}</div>` : ''}
                <p style="margin-top: 24px; font-size: 11px; color: #444;">Submitted: ${submittedAt} | IP: ${ip}</p>
              </div>
            `,
          });
        }

        // Customer acknowledgement email
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || emailUser,
          to: data.email,
          subject: `Enquiry Received — ${referenceNumber} | Trinetra Fire Solutions`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; background: #0e0e0e; color: #f5f0e8; padding: 32px; border-radius: 12px;">
              <h1 style="font-size: 22px; color: #D4A017; letter-spacing: 2px; margin-bottom: 4px;">TRINETRA FIRE SOLUTIONS</h1>
              <p style="color: #666; font-size: 12px; letter-spacing: 3px; margin-bottom: 24px;">PREDICT. PREVENT. PROTECT.</p>
              <h2 style="font-size: 16px; color: #f5f0e8; margin-bottom: 12px;">Thank you for your enquiry, ${data.fullName}.</h2>
              <p style="color: #aaa; line-height: 1.7; margin-bottom: 16px;">
                We have received your enquiry and our team will review it and contact you shortly.
              </p>
              <div style="background: #1a1a1a; border-left: 3px solid #C41E3A; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 12px; color: #888;">Your Reference Number</p>
                <p style="margin: 4px 0 0; font-size: 20px; font-family: monospace; color: #C41E3A; letter-spacing: 2px;">${referenceNumber}</p>
              </div>
              <p style="color: #aaa; font-size: 13px; line-height: 1.7; margin-bottom: 24px;">
                For urgent requirements, please call us directly:<br/>
                <a href="tel:+918332927131" style="color: #C41E3A; text-decoration: none;">+91 8332927131</a> or 
                <a href="tel:+917989813869" style="color: #C41E3A; text-decoration: none;">+91 7989813869</a>
              </p>
              <p style="font-size: 12px; color: #555; border-top: 1px solid #222; padding-top: 16px; margin: 0;">
                Trinetra Fire Solutions | Secunderabad, Telangana | GST: 36AEIPV1600H1ZL
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.warn('[Enquiry] Email send failed:', emailError);
        // Don't fail the request for email errors
      }
    }

    return NextResponse.json({
      success: true,
      referenceNumber,
      message: `Your enquiry has been received. Reference: ${referenceNumber}. We will contact you shortly.`,
    });

  } catch (error) {
    console.error('[Enquiry] Unhandled error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please call us directly.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Enquiry endpoint active' });
}
