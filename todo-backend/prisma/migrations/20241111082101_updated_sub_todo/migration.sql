/*
  Warnings:

  - You are about to drop the column `title` on the `SubTodo` table. All the data in the column will be lost.
  - Added the required column `subTitle` to the `SubTodo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubTodo" DROP COLUMN "title",
ADD COLUMN     "subTitle" TEXT NOT NULL;
