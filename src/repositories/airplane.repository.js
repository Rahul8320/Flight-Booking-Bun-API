import { CrudRepository } from "./crud-repository";
import { Airplane } from "../models";

export class AirplaneRepository extends CrudRepository {
  constructor() {
    super(Airplane);
  }
}
