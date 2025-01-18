import { BaseRepository } from "./base.repository";
import type { Airplane } from "@prisma/client";

export class AirplaneRepository extends BaseRepository<Airplane> {
  protected modelType: "airplane" = "airplane";
}
