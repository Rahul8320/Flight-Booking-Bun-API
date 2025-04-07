import { z } from "zod";

export const getFlightSchema = z
  .object({
    departureAirportCode: z
      .string()
      .min(3)
      .max(4, { message: "Airport code must be 3-4 characters" }),
    arrivalAirportCode: z
      .string()
      .min(3)
      .max(4, { message: "Airport code must be 3-4 characters" }),
    minPrice: z.coerce
      .number()
      .finite({ message: "Min Price must be a finite number" })
      .positive({ message: "Min Price must be a positive number" })
      .optional()
      .default(1),
    maxPrice: z.coerce
      .number()
      .finite({ message: "Max Price must be a finite number" })
      .positive({ message: "Max Price must be a positive number" })
      .optional(),
  })
  .strict();

export type IGetFlightQuery = z.infer<typeof getFlightSchema>;
