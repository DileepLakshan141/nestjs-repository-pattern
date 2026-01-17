import { BaseCrudRepository } from '@common/orm-lib';
import { User } from '../entities/user.model';
export declare class UserRepository extends BaseCrudRepository<User> {
    constructor();
    findByEmail(email: string): Promise<User | undefined>;
    findActiveUsers(): Promise<User[]>;
    findByRole(role: string): Promise<User[]>;
    search(query: string): Promise<User[]>;
    countByRole(role: string): Promise<number>;
    deactivate(id: number): Promise<User>;
    activate(id: number): Promise<User>;
    emailExists(email: string, excludeUserId?: number): Promise<boolean>;
    getStatistics(): Promise<{
        total: number;
        active: number;
        inactive: number;
        byRole: Record<string, number>;
    }>;
}
