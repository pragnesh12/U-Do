-- DropForeignKey
ALTER TABLE "SubTodo" DROP CONSTRAINT "SubTodo_todoId_fkey";

-- AddForeignKey
ALTER TABLE "SubTodo" ADD CONSTRAINT "SubTodo_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
