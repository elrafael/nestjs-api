import { Controller, Get, UseGuards, Request, Post, Body, Param } from '@nestjs/common'
import { AuthGuard } from '../auth/guards/auth.guard'
import { UsersService } from './users.service'
import { Roles } from 'src/decorators/roles.decorator'
import { Role } from 'src/enums/role.enum'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user
  }

  @UseGuards(AuthGuard)
  @Post('create')
  @Roles(Role.Admin)
  async createUser(@Request() req, @Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto) //
  }

  @UseGuards(AuthGuard)
  @Get('id/:id')
  async getById(@Param('id') id: number) {
    return this.usersService.getById(id)
  }
}
