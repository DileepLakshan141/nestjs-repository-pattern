"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCrudRepository = void 0;
class BaseCrudRepository {
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return (await this.model.query().insert(data));
    }
    async findById(id) {
        return (await this.model.query().findById(id));
    }
    async findOne(conditions) {
        return (await this.model.query().findOne(conditions));
    }
    async findAll(filters) {
        let query = this.model.query();
        if (filters) {
            query = query.where(filters);
        }
        return (await query);
    }
    async update(id, data) {
        return (await this.model.query().patchAndFetchById(id, data));
    }
    async delete(id) {
        const result = (await this.model.query().patchAndFetchById(id, {
            deleted_at: new Date(),
        }));
        return !!result;
    }
    async hardDelete(id) {
        const deletedCount = await this.model.query().deleteById(id);
        return deletedCount > 0;
    }
    async paginate(page = 1, limit = 10, filters) {
        let query = this.model.query();
        if (filters) {
            query = query.where(filters);
        }
        const total = await query.resultSize();
        const offset = (page - 1) * limit;
        const totalPages = Math.ceil(total / limit);
        const data = (await query.offset(offset).limit(limit));
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
    async count(filters) {
        let query = this.model.query();
        if (filters) {
            query = query.where(filters);
        }
        return await query.resultSize();
    }
    async exists(id) {
        const record = await this.findById(id);
        return !!record;
    }
    getQueryBuilder() {
        return this.model.query();
    }
}
exports.BaseCrudRepository = BaseCrudRepository;
//# sourceMappingURL=base-crud.repository.js.map