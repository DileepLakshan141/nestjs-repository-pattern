import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * Users Controller
 * Handles HTTP requests for user operations
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * POST /users
   * Create a new user
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * GET /users
   * Get all users with pagination
   * Query params: page (default: 1), limit (default: 10)
   */
  @Get()
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.usersService.findAll(pageNum, limitNum);
  }

  /**
   * GET /users/statistics
   * Get user statistics
   */
  @Get('statistics')
  getStatistics() {
    return this.usersService.getStatistics();
  }

  /**
   * GET /users/search?q=john
   * Search users by name or email
   */
  @Get('search')
  search(@Query('q') query: string) {
    return this.usersService.search(query);
  }

  /**
   * GET /users/active
   * Get all active users
   */
  @Get('active')
  getActive() {
    return this.usersService.getActiveUsers();
  }

  /**
   * GET /users/role/:role
   * Get users by role
   */
  @Get('role/:role')
  getUsersByRole(@Param('role') role: string) {
    return this.usersService.getUsersByRole(role);
  }

  /**
   * GET /users/:id
   * Get user by ID
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  /**
   * PATCH /users/:id
   * Update user
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * PATCH /users/:id/deactivate
   * Deactivate user
   */
  @Patch(':id/deactivate')
  deactivate(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deactivate(id);
  }

  /**
   * PATCH /users/:id/activate
   * Activate user
   */
  @Patch(':id/activate')
  activate(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.activate(id);
  }

  /**
   * DELETE /users/:id
   * Soft delete user
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  /**
   * DELETE /users/:id/hard
   * Hard delete user (permanent)
   */
  @Delete(':id/hard')
  @HttpCode(HttpStatus.NO_CONTENT)
  hardRemove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.hardRemove(id);
  }
}
