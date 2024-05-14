/*
  Warnings:

  - You are about to drop the column `name` on the `dentists` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `health_agents` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `nurses` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `dentists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `dentists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `health_agents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `health_agents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `nurses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `nurses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dentists" DROP COLUMN "name",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "name",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "health_agents" DROP COLUMN "name",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "nurses" DROP COLUMN "name",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL;
