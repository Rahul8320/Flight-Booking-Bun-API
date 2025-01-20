import { BaseRepository } from "./base.repository";
import type { Airplane } from "@prisma/client";

export class AirplaneRepository extends BaseRepository<Airplane> {
  protected modelType: "airplane" = "airplane";

  async IsModelNumberExists(modelNumber: string): Promise<boolean> {
    const airplane = await this.prisma[this.modelType].findUnique({
      where: { modelNumber },
    });
    return !!airplane;
  }
}
