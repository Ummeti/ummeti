import prisma from '@/lib/client';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const email = process.env.ADMIN_EMAIL;
  const code = request.nextUrl.searchParams.get('code');

  if (!code || code !== process.env.ADMIN_CODE) {
    return NextResponse.json(
      { message: 'Unauthorized - Invalid or missing code.' },
      { status: 401 }
    );
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Admin user already exists.' },
        { status: 403 }
      );
    }

    const newUser = await prisma.user.create({
      data: { name: 'Admin', email },
    });

    return NextResponse.json(
      { message: `Admin created successfully: ${newUser.email}` },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error during user creation:', error);

    return NextResponse.json(
      { message: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
