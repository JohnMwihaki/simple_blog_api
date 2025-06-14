-- CreateTable
CREATE TABLE "Users_table" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,

    CONSTRAINT "Users_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_table" (
    "post_id" TEXT NOT NULL,
    "post_title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "creted_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "post_table_pkey" PRIMARY KEY ("post_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_table_email_key" ON "Users_table"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_table_user_name_key" ON "Users_table"("user_name");

-- AddForeignKey
ALTER TABLE "post_table" ADD CONSTRAINT "post_table_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
