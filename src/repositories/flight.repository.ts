import type { Flight } from "@prisma/client";
import { BaseRepository } from "./base.repository";
import {
  IncludeAirplaneFields,
  IncludeAirportFields,
  IncludeFlightFields,
} from "../utils";
import type { FlightDTO } from "../DTOs";

export class FlightRepository extends BaseRepository<Flight> {
  protected modelType: "flight" = "flight";

  public async getAllFlights(
    filter: object,
    sort: object[]
  ): Promise<FlightDTO[]> {
    const flights = await this.prisma[this.modelType].findMany({
      where: filter,
      orderBy: sort,
      select: {
        ...IncludeFlightFields,
        airplane: {
          select: {
            ...IncludeAirplaneFields,
          },
        },
        arrivalAirport: {
          select: {
            ...IncludeAirportFields,
          },
        },
        departureAirport: {
          select: {
            ...IncludeAirportFields,
          },
        },
      },
    });

    return flights;
  }
}
