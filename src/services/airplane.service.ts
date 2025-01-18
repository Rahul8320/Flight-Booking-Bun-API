import { AirplaneRepository } from "../repositories";

export class AirplaneService {
  private _airplaneRepository;

  constructor() {
    this._airplaneRepository = new AirplaneRepository();
  }

  async createAirplane(data: any) {
    try {
      const airplane = await this._airplaneRepository.create(data);
      return airplane;
    } catch (error) {
      throw error;
    }
  }
}
