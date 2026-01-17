import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.model';
import * as bcrypt from 'bcrypt';

/**
 * Users Service
 * Contains business logic for user operations
 */
@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Create a new user
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if email already exists
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Create user using repository
    return await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role: createUserDto.role || 'user',
      is_active:
        createUserDto.is_active !== undefined ? createUserDto.is_active : true,
    } as Partial<User>);
  }

  /**
   * Get all users with pagination
   */
  async findAll(page: number = 1, limit: number = 10) {
    // Validate pagination params
    if (page < 1) {
      throw new BadRequestException('Page must be greater than 0');
    }
    if (limit < 1 || limit > 100) {
      throw new BadRequestException('Limit must be between 1 and 100');
    }

    return await this.userRepository.paginate(page, limit);
  }

  /**
   * Find user by ID
   */
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  /**
   * Update user
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // Check if user exists
    await this.findOne(id);

    // If updating email, check if new email already exists
    if (updateUserDto.email) {
      const emailExists = await this.userRepository.emailExists(
        updateUserDto.email,
        id,
      );
      if (emailExists) {
        throw new ConflictException('Email already exists');
      }
    }

    // If updating password, hash it
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    // Update user
    return await this.userRepository.update(id, updateUserDto as Partial<User>);
  }

  /**
   * Soft delete user
   */
  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.userRepository.delete(id);
  }

  /**
   * Hard delete user (permanent)
   */
  async hardRemove(id: number): Promise<void> {
    await this.findOne(id);
    await this.userRepository.hardDelete(id);
  }

  /**
   * Search users by name or email
   */
  async search(query: string): Promise<User[]> {
    if (!query || query.trim().length === 0) {
      throw new BadRequestException('Search query cannot be empty');
    }
    return await this.userRepository.search(query);
  }

  /**
   * Get active users
   */
  async getActiveUsers(): Promise<User[]> {
    return await this.userRepository.findActiveUsers();
  }

  /**
   * Get users by role
   */
  async getUsersByRole(role: string): Promise<User[]> {
    if (!['user', 'admin', 'moderator'].includes(role)) {
      throw new BadRequestException('Invalid role');
    }
    return await this.userRepository.findByRole(role);
  }

  /**
   * Deactivate user
   */
  async deactivate(id: number): Promise<User> {
    await this.findOne(id);
    return await this.userRepository.deactivate(id);
  }

  /**
   * Activate user
   */
  async activate(id: number): Promise<User> {
    await this.findOne(id);
    return await this.userRepository.activate(id);
  }

  /**
   * Get user statistics
   */
  async getStatistics() {
    return await this.userRepository.getStatistics();
  }
}
