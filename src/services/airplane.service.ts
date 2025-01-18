import { AirplaneRepository } from "../repositories";
import type { Airplane } from "@prisma/client";

type CreateAirplaneInput = Omit<Airplane, "id" | "createdAt" | "updatedAt">;

export class AirplaneService {
  private _airplaneRepository: AirplaneRepository;

  constructor() {
    this._airplaneRepository = new AirplaneRepository();
  }

  async createAirplane(data: CreateAirplaneInput): Promise<Airplane> {
    try {
      const airplane = await this._airplaneRepository.create(data);
      return airplane;
    } catch (error) {
      throw error;
    }
  }
}
