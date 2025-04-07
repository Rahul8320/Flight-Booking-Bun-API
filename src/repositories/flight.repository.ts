import type { Flight } from "@prisma/client";
import { BaseRepository } from "./base.repository";

export class FlightRepository extends BaseRepository<Flight> {
  protected modelType: "flight" = "flight";

  public async getAllFlights(filter: object): Promise<Flight[]> {
    const flights = await this.prisma[this.modelType].findMany({
      where: filter,
    });
    return flights;
  }
}
