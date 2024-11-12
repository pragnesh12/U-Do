-- CreateTable
CREATE TABLE "SubTodo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "todoId" TEXT NOT NULL,

    CONSTRAINT "SubTodo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubTodo" ADD CONSTRAINT "SubTodo_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
