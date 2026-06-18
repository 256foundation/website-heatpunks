import { NextRequest, NextResponse } from 'next/server';
import { sendGrantApplication } from '@/lib/email';
import { siteConfig } from '@/data/site';
import { GRANT_CHAR_LIMIT, type GrantApplication, type GrantCategoryId } from '@/types/grants';

const validCategories: GrantCategoryId[] = [
  'technical-standards',
  'academic-research',
  'regulatory-advocacy',
  'case-studies',
  'educational-content',
  'other',
];

export async function POST(request: NextRequest) {
  try {
    // Reject submissions while the grant program is paused.
    if (!siteConfig.grants.open) {
      return NextResponse.json(
        {
          error:
            'The grant program is currently paused and not accepting applications. Please check back once we have secured dedicated funding.',
        },
        { status: 503 }
      );
    }

    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'name',
      'email',
      'country',
      'category',
      'projectTitle',
      'projectDescription',
      'budget',
      'timeline',
      'impact',
      'background',
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate category
    if (!validCategories.includes(body.category)) {
      return NextResponse.json(
        { error: 'Invalid grant category' },
        { status: 400 }
      );
    }

    // Validate budget is a positive number
    const budget = parseFloat(body.budget);
    if (isNaN(budget) || budget <= 0) {
      return NextResponse.json(
        { error: 'Budget must be a positive number greater than zero' },
        { status: 400 }
      );
    }

    // Validate character limits before sanitizing
    const charLimitFields = [
      { name: 'projectDescription', value: body.projectDescription },
      { name: 'timeline', value: body.timeline },
      { name: 'impact', value: body.impact },
      { name: 'background', value: body.background },
    ];

    for (const field of charLimitFields) {
      if (String(field.value).length > GRANT_CHAR_LIMIT) {
        return NextResponse.json(
          { error: `${field.name} exceeds ${GRANT_CHAR_LIMIT} character limit` },
          { status: 400 }
        );
      }
    }

    // Validate all acknowledgements are checked
    const acknowledgements = [
      'ackBitcoin',
      'ackOpenLicense',
      'ackPublicShare',
      'ackNoGuarantee',
      'ackContact',
    ];

    for (const ack of acknowledgements) {
      if (body[ack] !== true) {
        return NextResponse.json(
          { error: 'All acknowledgement checkboxes must be checked' },
          { status: 400 }
        );
      }
    }

    // Sanitize and enforce character limits
    const sanitizedData: GrantApplication = {
      name: String(body.name).slice(0, 200),
      email: String(body.email).slice(0, 200),
      organization: String(body.organization || '').slice(0, 200),
      country: String(body.country).slice(0, 100),
      category: body.category as GrantCategoryId,
      projectTitle: String(body.projectTitle).slice(0, 500),
      projectDescription: String(body.projectDescription).slice(0, GRANT_CHAR_LIMIT),
      budget: budget,
      timeline: String(body.timeline).slice(0, GRANT_CHAR_LIMIT),
      impact: String(body.impact).slice(0, GRANT_CHAR_LIMIT),
      background: String(body.background).slice(0, GRANT_CHAR_LIMIT),
      references: String(body.references || '').slice(0, 1000),
      source: String(body.source || '').slice(0, 500),
      ackBitcoin: true,
      ackOpenLicense: true,
      ackPublicShare: true,
      ackNoGuarantee: true,
      ackContact: true,
    };

    // Send email
    const success = await sendGrantApplication(sanitizedData);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Failed to submit application. Please try again.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Grants API error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
