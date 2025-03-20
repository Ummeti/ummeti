import NextAuth from 'next-auth';
import Nodemailer from 'next-auth/providers/nodemailer';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: {
    ...PrismaAdapter(prisma),
    async deleteSession(sessionToken) {
      try {
        return await prisma.session.delete({ where: { sessionToken } });
      } catch (error) {
        if (
          error instanceof PrismaClientKnownRequestError &&
          error.code === 'P2025'
        ) {
          return null;
        }
        throw error;
      }
    },
  },
  trustHost: true,
  providers: [
    Nodemailer({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        tls: { rejectUnauthorized: false },
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      },
      from: process.env.EMAIL_USER,
    }),
  ],
  pages: {
    signIn: '/login',
  },
});
