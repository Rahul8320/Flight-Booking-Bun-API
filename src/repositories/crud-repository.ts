import { logger } from "../config";

export class CrudRepository {
  private _model: any;

  constructor(model: any) {
    this._model = model;
  }

  async create(data: any) {
    try {
      const result = await this._model.create(data);
      return result;
    } catch (err) {
      logger.error("Error creating data", err);
      throw err;
    }
  }

  async destroy(id: number) {
    try {
      const result = await this._model.destroy({ where: { id } });
      return result;
    } catch (err) {
      logger.error(`Error deleting data with id: ${id}`, err);
      throw err;
    }
  }

  async get(id: number) {
    try {
      const result = await this._model.findByPk(id);
      return result;
    } catch (err) {
      logger.error(`Error getting data with id: ${id}`, err);
      throw err;
    }
  }

  async getAll() {
    try {
      const result = await this._model.findAll();
      return result;
    } catch (err) {
      logger.error("Error getting all data", err);
      throw err;
    }
  }

  async update(id: number, data: any) {
    try {
      const result = await this._model.update(data, { where: { id } });
      return result;
    } catch (err) {
      logger.error(`Error updating data with id: ${id}`, err);
      throw err;
    }
  }
}
