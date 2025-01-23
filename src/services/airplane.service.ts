import { AirplaneRepository } from "../repositories";
import type { Airplane } from "@prisma/client";
import { AirplaneError } from "../utils";
import {
  ServiceResult,
  ServiceSuccessResult,
  ServiceValidationErrorResult,
} from "./service-result";
import { StatusCodes } from "../models";

type CreateAirplaneInput = Omit<Airplane, "id" | "createdAt" | "updatedAt">;

export class AirplaneService {
  private _airplaneRepository: AirplaneRepository;

  constructor() {
    this._airplaneRepository = new AirplaneRepository();
  }

  async createAirplane(
    data: CreateAirplaneInput
  ): Promise<ServiceResult<Airplane>> {
    try {
      const isModelNumberExists =
        await this._airplaneRepository.IsModelNumberExists(data.modelNumber);

      if (isModelNumberExists) {
        return new ServiceValidationErrorResult(StatusCodes.BAD_REQUEST, [
          AirplaneError.ValidationError.ModelNumberExists,
        ]);
      }

      const airplane = await this._airplaneRepository.create(data);
      return new ServiceSuccessResult<Airplane>(StatusCodes.CREATED, airplane);
    } catch (err: any) {
      throw err;
    }
  }
}
