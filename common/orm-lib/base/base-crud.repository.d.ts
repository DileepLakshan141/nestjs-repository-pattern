import { ModelClass, QueryBuilder } from "objection";
import { BaseModel } from "./base.model";
import { ICrudService, PaginationResult } from "./crud.service";
export declare class BaseCrudRepository<T extends BaseModel> implements ICrudService<T> {
    protected model: ModelClass<T>;
    constructor(model: ModelClass<T>);
    create(data: Partial<T>): Promise<T>;
    findById(id: number): Promise<T | undefined>;
    findOne(conditions: Partial<T>): Promise<T | undefined>;
    findAll(filters?: Partial<T>): Promise<T[]>;
    update(id: number, data: Partial<T>): Promise<T>;
    delete(id: number): Promise<boolean>;
    hardDelete(id: number): Promise<boolean>;
    paginate(page?: number, limit?: number, filters?: Partial<T>): Promise<PaginationResult<T>>;
    count(filters?: Partial<T>): Promise<number>;
    exists(id: number): Promise<boolean>;
    protected getQueryBuilder(): QueryBuilder<T, T[]>;
}
