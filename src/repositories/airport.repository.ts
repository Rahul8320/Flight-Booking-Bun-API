import type { Airport } from "@prisma/client";
import { BaseRepository } from "./base.repository";

export class AirportRepository extends BaseRepository<Airport> {
  protected modelType: "airport" = "airport";

  async IsAirportExists(name: string, code: string): Promise<boolean> {
    const airplane = await this.prisma[this.modelType].findUnique({
      where: { name, code },
    });
    return !!airplane;
  }
}
