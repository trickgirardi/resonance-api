import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  Max,
  IsDateString,
  IsUUID,
} from 'class-validator';
import { Gender, FriendshipLevel, RelationshipContext } from '@prisma/client';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(31)
  birthDay?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  birthMonth?: number;

  @IsOptional()
  @IsInt()
  birthYear?: number;

  @IsOptional()
  @IsEnum(FriendshipLevel)
  friendshipLevel?: FriendshipLevel;

  @IsOptional()
  @IsEnum(RelationshipContext)
  relationshipContext?: RelationshipContext;

  @IsOptional()
  @IsInt()
  @Min(0)
  contactFrequency?: number;

  @IsOptional()
  @IsDateString()
  lastInteraction?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
