-- CreateTable
CREATE TABLE "Airplane" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modelNumber" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "Airplane_modelNumber_key" ON "Airplane"("modelNumber");
