import type { Decimal } from "@prisma/client/runtime/library";

export interface ICreateFlightInput {
  flightNumber: string;
  airplaneId: number;
  departureAirportCode: string;
  arrivalAirportCode: string;
  departureTime: Date;
  arrivalTime: Date;
  price: Decimal;
  totalSeats: number;
}
