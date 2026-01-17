import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.model';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(page?: number, limit?: number): Promise<import("@common/orm-lib").PaginationResult<User>>;
    findOne(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
    hardRemove(id: number): Promise<void>;
    search(query: string): Promise<User[]>;
    getActiveUsers(): Promise<User[]>;
    getUsersByRole(role: string): Promise<User[]>;
    deactivate(id: number): Promise<User>;
    activate(id: number): Promise<User>;
    getStatistics(): Promise<{
        total: number;
        active: number;
        inactive: number;
        byRole: Record<string, number>;
    }>;
}
