-- CreateEnum
CREATE TYPE "FriendshipLevel" AS ENUM ('BEST_FRIEND', 'CLOSE_FRIEND', 'FRIEND', 'ACQUAINTANCE', 'STRANGER');

-- CreateEnum
CREATE TYPE "RelationshipContext" AS ENUM ('FAMILY', 'ROMANTIC_PARTNER', 'COLLEAGUE', 'CLASSMATE', 'NEIGHBOR');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'NON_BINARY', 'OTHER');

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "Gender",
    "birthDay" INTEGER,
    "birthMonth" INTEGER,
    "birthYear" INTEGER,
    "friendshipLevel" "FriendshipLevel",
    "relationshipContext" "RelationshipContext",
    "contactFrequency" INTEGER,
    "lastInteraction" TIMESTAMP(3),
    "notes" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
