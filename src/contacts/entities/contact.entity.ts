import {
  Contact,
  Gender,
  FriendshipLevel,
  RelationshipContext,
} from '@prisma/client';

export class ContactEntity implements Contact {
  id: number;
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

  userId: number;

  createdAt: Date;
  updatedAt: Date;
}
