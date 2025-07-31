import { User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  name: string;
  email: string;
  password: string;

  emailVerified: boolean;
  emailVerificationToken: string;
  emailVerificationTokenExpiresAt: Date;

  createdAt: Date;
  updatedAt: Date;
}
