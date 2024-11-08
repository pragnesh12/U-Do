/*
  Warnings:

  - You are about to drop the column `IsVerified` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "IsVerified",
ADD COLUMN     "isVerifiedEmail" BOOLEAN NOT NULL DEFAULT false;
