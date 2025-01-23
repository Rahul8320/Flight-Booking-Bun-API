import { PrismaClient } from "@prisma/client";

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
    const result = await (this.prisma[this.modelType] as any).create({
      data,
    });
    return result;
  }

  async delete(id: number): Promise<T> {
    const result = await (this.prisma[this.modelType] as any).delete({
      where: { id },
    });
    return result;
  }

  async get(id: number): Promise<T | null> {
    const result = await (this.prisma[this.modelType] as any).findUnique({
      where: { id },
    });
    return result;
  }

  async getAll(): Promise<T[]> {
    const result = await (this.prisma[this.modelType] as any).findMany();
    return result;
  }

  async update(
    id: number,
    data: Partial<Omit<T, "id" | "createdAt" | "updatedAt">>
  ): Promise<T> {
    const result = await (this.prisma[this.modelType] as any).update({
      where: { id },
      data,
    });
    return result;
  }
}
