-- DropForeignKey
ALTER TABLE "dentists" DROP CONSTRAINT "dentists_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "health_agents" DROP CONSTRAINT "health_agents_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "health_team_areas" DROP CONSTRAINT "health_team_areas_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "health_teams" DROP CONSTRAINT "health_teams_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "health_unit_areas" DROP CONSTRAINT "health_unit_areas_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "health_units" DROP CONSTRAINT "health_units_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "micro_areas" DROP CONSTRAINT "micro_areas_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "nurses" DROP CONSTRAINT "nurses_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "nursing_technicians" DROP CONSTRAINT "nursing_technicians_created_by_id_fkey";

-- AlterTable
ALTER TABLE "dentists" ALTER COLUMN "created_by_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "doctors" ALTER COLUMN "created_by_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "health_agents" ALTER COLUMN "created_by_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "health_team_areas" ALTER COLUMN "created_by_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "health_teams" ALTER COLUMN "created_by_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "health_unit_areas" ALTER COLUMN "created_by_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "health_units" ALTER COLUMN "created_by_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "micro_areas" ALTER COLUMN "created_by_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "nurses" ALTER COLUMN "created_by_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "nursing_technicians" ALTER COLUMN "created_by_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "health_units" ADD CONSTRAINT "health_units_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health_unit_areas" ADD CONSTRAINT "health_unit_areas_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health_teams" ADD CONSTRAINT "health_teams_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health_team_areas" ADD CONSTRAINT "health_team_areas_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nurses" ADD CONSTRAINT "nurses_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nursing_technicians" ADD CONSTRAINT "nursing_technicians_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dentists" ADD CONSTRAINT "dentists_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health_agents" ADD CONSTRAINT "health_agents_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "micro_areas" ADD CONSTRAINT "micro_areas_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
