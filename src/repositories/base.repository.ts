import { PrismaClient } from "@prisma/client";
import { logger } from "../config";

export interface IBaseRepository<T> {
  create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T>;
  get(id: number): Promise<T | null>;
  getAll(): Promise<T[]>;
  update(
    id: number,
    data: Partial<Omit<T, "id" | "createdAt" | "updatedAt">>
  ): Promise<T>;
  delete(id: number): Promise<T>;
}

export abstract class BaseRepository<T extends { id: number }>
  implements IBaseRepository<T>
{
  protected prisma: PrismaClient;
  protected abstract modelType: keyof PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T> {
    try {
      const result = await (this.prisma[this.modelType] as any).create({
        data,
      });
      return result;
    } catch (err) {
      logger.error("Error creating data", err);
      throw err;
    }
  }

  async delete(id: number): Promise<T> {
    try {
      const result = await (this.prisma[this.modelType] as any).delete({
        where: { id },
      });
      return result;
    } catch (err) {
      logger.error(`Error deleting data with id: ${id}`, err);
      throw err;
    }
  }

  async get(id: number): Promise<T | null> {
    try {
      const result = await (this.prisma[this.modelType] as any).findUnique({
        where: { id },
      });
      return result;
    } catch (err) {
      logger.error(`Error getting data with id: ${id}`, err);
      throw err;
    }
  }

  async getAll(): Promise<T[]> {
    try {
      const result = await (this.prisma[this.modelType] as any).findMany();
      return result;
    } catch (err) {
      logger.error("Error getting all data", err);
      throw err;
    }
  }

  async update(
    id: number,
    data: Partial<Omit<T, "id" | "createdAt" | "updatedAt">>
  ): Promise<T> {
    try {
      const result = await (this.prisma[this.modelType] as any).update({
        where: { id },
        data,
      });
      return result;
    } catch (err) {
      logger.error(`Error updating data with id: ${id}`, err);
      throw err;
    }
  }
}
