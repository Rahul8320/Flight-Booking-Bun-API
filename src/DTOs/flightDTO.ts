import type { Decimal } from "@prisma/client/runtime/library";

export type FlightDTO = {
  id: number;
  flightNumber: string;
  airplaneId: number;
  departureAirportCode: string;
  arrivalAirportCode: string;
  departureTime: Date;
  arrivalTime: Date;
  totalSeats: number;
  price: Decimal;
  boardingGate: string | null;
  airplane?: AirplaneDTO;
  departureAirport?: AirportDTO;
  arrivalAirport?: AirportDTO;
};

type AirplaneDTO = {
  id: number;
  modelNumber: string;
  capacity: number;
};

type AirportDTO = {
  id: number;
  name: string;
  code: string;
  address: string;
  cityId: number;
};
