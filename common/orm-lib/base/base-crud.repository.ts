import { ModelClass, QueryBuilder } from "objection";
import { BaseModel } from "./base.model";
import { ICrudService, PaginationResult } from "./crud.service";

export class BaseCrudRepository<
  T extends BaseModel,
> implements ICrudService<T> {
  protected model: ModelClass<T>;

  constructor(model: ModelClass<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    return (await this.model.query().insert(data as any)) as T;
  }

  async findById(id: number): Promise<T | undefined> {
    return (await this.model.query().findById(id)) as T | undefined;
  }

  async findOne(conditions: Partial<T>): Promise<T | undefined> {
    return (await this.model.query().findOne(conditions as any)) as
      | T
      | undefined;
  }

  async findAll(filters?: Partial<T>): Promise<T[]> {
    let query = this.model.query();
    if (filters) {
      query = query.where(filters as any);
    }
    return (await query) as T[];
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    return (await this.model.query().patchAndFetchById(id, data as any)) as T;
  }

  async delete(id: number): Promise<boolean> {
    const result = (await this.model.query().patchAndFetchById(id, {
      deleted_at: new Date(),
    } as any)) as T | undefined;
    return !!result;
  }

  async hardDelete(id: number): Promise<boolean> {
    const deletedCount = await this.model.query().deleteById(id);
    return deletedCount > 0;
  }

  async paginate(
    page: number = 1,
    limit: number = 10,
    filters?: Partial<T>,
  ): Promise<PaginationResult<T>> {
    let query = this.model.query();
    if (filters) {
      query = query.where(filters as any);
    }

    const total = await query.resultSize();
    const offset = (page - 1) * limit;
    const totalPages = Math.ceil(total / limit);
    const data = (await query.offset(offset).limit(limit)) as T[];

    return {
      data,
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  async count(filters?: Partial<T>): Promise<number> {
    let query = this.model.query();
    if (filters) {
      query = query.where(filters as any);
    }
    return await query.resultSize();
  }

  async exists(id: number): Promise<boolean> {
    const record = await this.findById(id);
    return !!record;
  }

  protected getQueryBuilder(): QueryBuilder<T, T[]> {
    return this.model.query() as QueryBuilder<T, T[]>;
  }
}
