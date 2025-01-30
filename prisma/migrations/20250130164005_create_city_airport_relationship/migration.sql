/*
  Warnings:

  - You are about to drop the `airports` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "airports";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Airports" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Airports_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "Cities" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Airports_name_key" ON "Airports"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Airports_code_key" ON "Airports"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Airports_address_key" ON "Airports"("address");
