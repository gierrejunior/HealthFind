/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "name",
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "last_login" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "last_name" TEXT;
