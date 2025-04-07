import type { Airport } from "@prisma/client";
import { BaseRepository } from "./base.repository";

export class AirportRepository extends BaseRepository<Airport> {
  protected modelType: "airport" = "airport";

  async isAirportExists(name: string, code: string): Promise<boolean> {
    const airport = await this.prisma[this.modelType].findUnique({
      where: { name, code },
    });
    return !!airport;
  }

  async getAirportByCode(code: string): Promise<Airport | null> {
    const airport = await this.prisma[this.modelType].findUnique({
      where: { code },
    });
    return airport;
  }
}
