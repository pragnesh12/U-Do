/*
  Warnings:

  - The primary key for the `Todo` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ListAndTags" DROP CONSTRAINT "ListAndTags_todoId_fkey";

-- AlterTable
ALTER TABLE "ListAndTags" ALTER COLUMN "todoId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Todo_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "ListAndTags" ADD CONSTRAINT "ListAndTags_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
