export interface ICrudService<T> {
  create(data: Partial<T>): Promise<T>;
  findById(id: number): Promise<T | undefined>;
  findOne(conditions: Partial<T>): Promise<T | undefined>;
  findAll(filters?: Partial<T>): Promise<T[]>;
  update(id: number, data: Partial<T>): Promise<T>;
  delete(id: number): Promise<boolean>;
  hardDelete(id: number): Promise<boolean>;
  paginate(
    page: number,
    limit: number,
    filters?: Partial<T>,
  ): Promise<{
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
