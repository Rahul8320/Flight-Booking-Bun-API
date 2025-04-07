-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Flights" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "flightNumber" TEXT NOT NULL,
    "airplaneId" INTEGER NOT NULL,
    "departureAirportCode" TEXT NOT NULL,
    "arrivalAirportCode" TEXT NOT NULL,
    "departureTime" DATETIME NOT NULL,
    "arrivalTime" DATETIME NOT NULL,
    "price" DECIMAL NOT NULL,
    "boardingGate" TEXT,
    "totalSeats" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Flights_airplaneId_fkey" FOREIGN KEY ("airplaneId") REFERENCES "Airplanes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Flights_departureAirportCode_fkey" FOREIGN KEY ("departureAirportCode") REFERENCES "Airports" ("code") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Flights_arrivalAirportCode_fkey" FOREIGN KEY ("arrivalAirportCode") REFERENCES "Airports" ("code") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Flights" ("airplaneId", "arrivalAirportCode", "arrivalTime", "boardingGate", "departureAirportCode", "departureTime", "flightNumber", "id", "price", "totalSeats") SELECT "airplaneId", "arrivalAirportCode", "arrivalTime", "boardingGate", "departureAirportCode", "departureTime", "flightNumber", "id", "price", "totalSeats" FROM "Flights";
DROP TABLE "Flights";
ALTER TABLE "new_Flights" RENAME TO "Flights";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
