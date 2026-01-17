import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.model").User>;
    findAll(page?: string, limit?: string): Promise<import("@common/orm-lib").PaginationResult<import("./entities/user.model").User>>;
    getStatistics(): Promise<{
        total: number;
        active: number;
        inactive: number;
        byRole: Record<string, number>;
    }>;
    search(query: string): Promise<import("./entities/user.model").User[]>;
    getActive(): Promise<import("./entities/user.model").User[]>;
    getUsersByRole(role: string): Promise<import("./entities/user.model").User[]>;
    findOne(id: number): Promise<import("./entities/user.model").User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("./entities/user.model").User>;
    deactivate(id: number): Promise<import("./entities/user.model").User>;
    activate(id: number): Promise<import("./entities/user.model").User>;
    remove(id: number): Promise<void>;
    hardRemove(id: number): Promise<void>;
}
