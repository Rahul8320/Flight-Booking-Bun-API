-- CreateTable
CREATE TABLE "Flights" (
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
    CONSTRAINT "Flights_airplaneId_fkey" FOREIGN KEY ("airplaneId") REFERENCES "Airplanes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Flights_departureAirportCode_fkey" FOREIGN KEY ("departureAirportCode") REFERENCES "Airports" ("code") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Flights_arrivalAirportCode_fkey" FOREIGN KEY ("arrivalAirportCode") REFERENCES "Airports" ("code") ON DELETE CASCADE ON UPDATE CASCADE
);
