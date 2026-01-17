import { Injectable } from '@nestjs/common';
import { BaseCrudRepository } from '@common/orm-lib';
import { User } from '../entities/user.model';

@Injectable()
export class UserRepository extends BaseCrudRepository<User> {
  constructor() {
    super(User);
  }

  // ========================================
  // CUSTOM METHODS - Business Logic Specific to User
  // ========================================

  /**
   * Find user by email address
   * @param email - User's email
   * @returns User or undefined
   */
  async findByEmail(email: string): Promise<User | undefined> {
    return await this.model.query().where('email', email).first();
  }

  /**
   * Find all active users (not soft-deleted)
   * @returns Array of active users
   */
  async findActiveUsers(): Promise<User[]> {
    return (await this.getQueryBuilder()
      .where('is_active', true)
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc')) as User[];
  }

  /**
   * Find users by role
   * @param role - User role (user, admin, moderator)
   * @returns Array of users with specified role
   */
  async findByRole(role: string): Promise<User[]> {
    return (await this.getQueryBuilder()
      .where('role', role)
      .whereNull('deleted_at')
      .orderBy('name', 'asc')) as User[];
  }

  /**
   * Search users by name or email
   * @param query - Search term
   * @returns Array of matching users (max 20)
   */
  async search(query: string): Promise<User[]> {
    return (await this.getQueryBuilder()
      .where((builder) => {
        builder
          .where('name', 'ilike', `%${query}%`)
          .orWhere('email', 'ilike', `%${query}%`);
      })
      .whereNull('deleted_at')
      .limit(20)
      .orderBy('name', 'asc')) as User[];
  }

  /**
   * Count users by role
   * @param role - User role
   * @returns Number of users with that role
   */
  async countByRole(role: string): Promise<number> {
    interface CountResult {
      total: string | number;
    }

    const result = (await this.model
      .query()
      .where('role', role)
      .whereNull('deleted_at')
      .count('* as total')
      .first()) as unknown as CountResult;

    return parseInt(String(result?.total)) || 0;
  }

  /**
   * Deactivate a user (soft operation, different from delete)
   * @param id - User ID
   * @returns Updated user
   */
  async deactivate(id: number): Promise<User> {
    return await this.update(id, { is_active: false } as Partial<User>);
  }

  /**
   * Activate a user
   * @param id - User ID
   * @returns Updated user
   */
  async activate(id: number): Promise<User> {
    return await this.update(id, { is_active: true } as Partial<User>);
  }

  /**
   * Check if email already exists
   * @param email - Email to check
   * @param excludeUserId - Optional user ID to exclude (for updates)
   * @returns true if email exists, false otherwise
   */
  async emailExists(email: string, excludeUserId?: number): Promise<boolean> {
    let query = this.model.query().where('email', email);

    if (excludeUserId) {
      query = query.whereNot('id', excludeUserId);
    }

    const user = await query.first();
    return !!user;
  }

  /**
   * Get user statistics
   * @returns Statistics object
   */
  async getStatistics(): Promise<{
    total: number;
    active: number;
    inactive: number;
    byRole: Record<string, number>;
  }> {
    const total = await this.count({ deleted_at: undefined } as Partial<User>);
    const active = await this.count({
      is_active: true,
      deleted_at: undefined,
    } as Partial<User>);
    const inactive = await this.count({
      is_active: false,
      deleted_at: undefined,
    } as Partial<User>);

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
}
