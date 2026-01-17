"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./repositories/user.repository");
const bcrypt = __importStar(require("bcrypt"));
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const existingUser = await this.userRepository.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new common_1.ConflictException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        return await this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
            role: createUserDto.role || 'user',
            is_active: createUserDto.is_active !== undefined ? createUserDto.is_active : true,
        });
    }
    async findAll(page = 1, limit = 10) {
        if (page < 1) {
            throw new common_1.BadRequestException('Page must be greater than 0');
        }
        if (limit < 1 || limit > 100) {
            throw new common_1.BadRequestException('Limit must be between 1 and 100');
        }
        return await this.userRepository.paginate(page, limit);
    }
    async findOne(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async findByEmail(email) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }
    async update(id, updateUserDto) {
        await this.findOne(id);
        if (updateUserDto.email) {
            const emailExists = await this.userRepository.emailExists(updateUserDto.email, id);
            if (emailExists) {
                throw new common_1.ConflictException('Email already exists');
            }
        }
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        return await this.userRepository.update(id, updateUserDto);
    }
    async remove(id) {
        await this.findOne(id);
        await this.userRepository.delete(id);
    }
    async hardRemove(id) {
        await this.findOne(id);
        await this.userRepository.hardDelete(id);
    }
    async search(query) {
        if (!query || query.trim().length === 0) {
            throw new common_1.BadRequestException('Search query cannot be empty');
        }
        return await this.userRepository.search(query);
    }
    async getActiveUsers() {
        return await this.userRepository.findActiveUsers();
    }
    async getUsersByRole(role) {
        if (!['user', 'admin', 'moderator'].includes(role)) {
            throw new common_1.BadRequestException('Invalid role');
        }
        return await this.userRepository.findByRole(role);
    }
    async deactivate(id) {
        await this.findOne(id);
        return await this.userRepository.deactivate(id);
    }
    async activate(id) {
        await this.findOne(id);
        return await this.userRepository.activate(id);
    }
    async getStatistics() {
        return await this.userRepository.getStatistics();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map