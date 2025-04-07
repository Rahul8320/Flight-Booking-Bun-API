import { Decimal } from "@prisma/client/runtime/library";
import { z } from "zod";

export const createFlightSchema = z
  .object({
    flightNumber: z.string().min(1, { message: "Flight number is required" }),
    airplaneId: z
      .number()
      .int()
      .positive({ message: "Airplane ID must be a positive integer" }),
    departureAirportCode: z
      .string()
      .min(3)
      .max(4, { message: "Airport code must be 3-4 characters" }),
    arrivalAirportCode: z
      .string()
      .min(3)
      .max(4, { message: "Airport code must be 3-4 characters" }),
    departureTime: z.coerce.date(),
    arrivalTime: z.coerce.date(),
    price: z
      .instanceof(Decimal)
      .or(z.string().transform((val) => new Decimal(val))),
    totalSeats: z
      .number()
      .int()
      .positive({ message: "Total seats must be a positive integer" }),
    boardingGate: z.string().nullable(),
  })
  .strict()
  .refine(
    (data) => {
      // Validate that arrival time is after departure time
      return data.arrivalTime.getTime() > data.departureTime.getTime();
    },
    {
      message: "Arrival time must be after departure time",
      path: ["arrivalTime"],
    }
  );

export type ICreateFlightInput = z.infer<typeof createFlightSchema>;
