import { BaseRepository } from "./base.repository";
import type { City } from "@prisma/client";

export class CityRepository extends BaseRepository<City> {
  protected modelType: "city" = "city";

  async IsCityExists(cityName: string): Promise<boolean> {
    const city = await this.prisma[this.modelType].findUnique({
      where: { name: cityName },
    });
    return !!city;
  }

  async GetCityByName(cityName: string): Promise<City | null> {
    const city = await this.prisma[this.modelType].findUnique({
      where: { name: cityName },
    });

    return city;
  }
}
