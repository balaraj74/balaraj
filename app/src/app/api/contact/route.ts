import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const web3FormsKey =
      process.env.WEB3FORMS_ACCESS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      '0c154582-5b11-42f0-bfa8-c689ccb62a26';

    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide your name.' },
        { status: 400 }
      );
    }

    if (
      !email ||
      typeof email !== 'string' ||
      !email.includes('@') ||
      !email.includes('.')
    ) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 3) {
      return NextResponse.json(
        { error: 'Please provide a message.' },
        { status: 400 }
      );
    }

    // Submit to Web3Forms API
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: web3FormsKey,
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        from_name: 'Balaraj Portfolio',
        subject: `New Portfolio Message from ${name.trim()}`,
      }),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to deliver message via Web3Forms');
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Server Error';
    console.error('Contact API Route Error:', errorMessage);
    return NextResponse.json(
      { error: errorMessage || 'Failed to deliver message. Please try again or email directly.' },
      { status: 500 }
    );
  }
}
