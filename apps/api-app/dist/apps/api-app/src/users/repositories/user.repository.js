"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const orm_lib_1 = require("../../../../../common/orm-lib");
const user_model_1 = require("../entities/user.model");
let UserRepository = class UserRepository extends orm_lib_1.BaseCrudRepository {
    constructor() {
        super(user_model_1.User);
    }
    async findByEmail(email) {
        return await this.model.query().where('email', email).first();
    }
    async findActiveUsers() {
        return (await this.getQueryBuilder()
            .where('is_active', true)
            .whereNull('deleted_at')
            .orderBy('created_at', 'desc'));
    }
    async findByRole(role) {
        return (await this.getQueryBuilder()
            .where('role', role)
            .whereNull('deleted_at')
            .orderBy('name', 'asc'));
    }
    async search(query) {
        return (await this.getQueryBuilder()
            .where((builder) => {
            builder
                .where('name', 'ilike', `%${query}%`)
                .orWhere('email', 'ilike', `%${query}%`);
        })
            .whereNull('deleted_at')
            .limit(20)
            .orderBy('name', 'asc'));
    }
    async countByRole(role) {
        const result = (await this.model
            .query()
            .where('role', role)
            .whereNull('deleted_at')
            .count('* as total')
            .first());
        return parseInt(String(result?.total)) || 0;
    }
    async deactivate(id) {
        return await this.update(id, { is_active: false });
    }
    async activate(id) {
        return await this.update(id, { is_active: true });
    }
    async emailExists(email, excludeUserId) {
        let query = this.model.query().where('email', email);
        if (excludeUserId) {
            query = query.whereNot('id', excludeUserId);
        }
        const user = await query.first();
        return !!user;
    }
    async getStatistics() {
        const total = await this.count({ deleted_at: undefined });
        const active = await this.count({
            is_active: true,
            deleted_at: undefined,
        });
        const inactive = await this.count({
            is_active: false,
            deleted_at: undefined,
        });
        const userCount = await this.countByRole('user');
        const adminCount = await this.countByRole('admin');
        const moderatorCount = await this.countByRole('moderator');
        return {
            total,
            active,
            inactive,
            byRole: {
                user: userCount,
                admin: adminCount,
                moderator: moderatorCount,
            },
        };
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UserRepository);
//# sourceMappingURL=user.repository.js.map