-- CreateTable
CREATE TABLE "ListAndTags" (
    "id" SERIAL NOT NULL,
    "todoId" INTEGER NOT NULL,

    CONSTRAINT "ListAndTags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ListAndTags" ADD CONSTRAINT "ListAndTags_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
