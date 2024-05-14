/*
  Warnings:

  - You are about to drop the column `county` on the `health_units` table. All the data in the column will be lost.
  - You are about to drop the column `uf` on the `health_units` table. All the data in the column will be lost.
  - Added the required column `city` to the `health_units` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `health_units` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "health_units" DROP COLUMN "county",
DROP COLUMN "uf",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
