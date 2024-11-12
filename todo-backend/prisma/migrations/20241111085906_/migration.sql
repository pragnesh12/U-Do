/*
  Warnings:

  - You are about to drop the column `done` on the `SubTodo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SubTodo" DROP COLUMN "done",
ADD COLUMN     "subDone" BOOLEAN NOT NULL DEFAULT false;
