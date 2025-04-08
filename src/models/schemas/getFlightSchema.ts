import { z } from "zod";

const supportedSortFields: string[] = ["price", "departureTime", "arrivalTime"];

export const getFlightSchema = z
  .object({
    trips: z.string().regex(/^([a-zA-Z0-9]{3,4})-([a-zA-Z0-9]{3,4})$/, {
      message:
        "Trips must be in the format 'departure-arrival', with each code being 3-4 characters.",
    }),
    price: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          const parts = val.split("-");
          if (parts.length !== 2) return false;
          const [minStr, maxStr] = parts;
          const min = Number(minStr);
          const max = Number(maxStr);
          return (
            !isNaN(min) &&
            Number.isFinite(min) &&
            min > 0 &&
            !isNaN(max) &&
            Number.isFinite(max) &&
            max > 0 &&
            min <= max
          );
        },
        {
          message:
            "Price must be in the format 'min-max', with both being non-negative finite numbers, and minPrice <= maxPrice.",
        }
      ),
    travelers: z.coerce
      .number()
      .finite({ message: "Travelers must be a finite number" })
      .positive({ message: "Travelers must be a positive number" })
      .optional()
      .default(1),
    depart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Depart date must be in 'YYYY-MM-DD' format.",
    }),
    sort: z
      .string()
      .optional()
      .refine(
        (sortString) => {
          if (!sortString) {
            return true;
          }

          const sortCriteria = sortString.split(",");

          for (const criterion of sortCriteria) {
            const parts = criterion.trim().split("_");

            if (parts.length !== 2) {
              return false;
            }

            const [field, direction] = parts;

            if (!supportedSortFields.includes(field)) {
              return false;
            }

            if (direction !== "ASC" && direction !== "DESC") {
              return false;
            }
          }

          return true;
        },
        {
          message: `Sort must be in the format "fieldName_ASC|DESC,fieldName_ASC|DESC,...". Supported fields are: ${supportedSortFields.join(
            ", "
          )}`,
        }
      ),
  })
  .strict();

export type IGetFlightQuery = z.infer<typeof getFlightSchema>;
