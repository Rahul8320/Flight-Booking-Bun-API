import type { Flight } from "@prisma/client";
import { BaseRepository } from "./base.repository";

export class FlightRepository extends BaseRepository<Flight> {
  protected modelType: "flight" = "flight";
}
