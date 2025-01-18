/*
  Warnings:

  - You are about to drop the `Airplane` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Airplane";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Airplanes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modelNumber" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Airplanes_modelNumber_key" ON "Airplanes"("modelNumber");
