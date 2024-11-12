/*
  Warnings:

  - The primary key for the `SubTodo` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "SubTodo" DROP CONSTRAINT "SubTodo_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SubTodo_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SubTodo_id_seq";
