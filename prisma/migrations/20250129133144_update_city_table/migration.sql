/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Cities` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Cities_code_key";

-- CreateIndex
CREATE UNIQUE INDEX "Cities_name_key" ON "Cities"("name");
