import {
  Contact,
  Gender,
  FriendshipLevel,
  RelationshipContext,
} from '@prisma/client';

export class ContactEntity implements Contact {
  id: string;
  name: string;
  gender: Gender;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  friendshipLevel: FriendshipLevel;
  relationshipContext: RelationshipContext;
  contactFrequency: number;
  lastInteraction: Date;
  notes: string;

  userId: string;

  createdAt: Date;
  updatedAt: Date;
}
