import { Controller, Get, UseGuards, Request, Post, Body, Param } from '@nestjs/common'
import { AuthGuard } from '../auth/guards/auth.guard'
import { UsersService } from './users.service'
import { Roles } from 'src/decorators/roles.decorator'
import { Role } from 'src/enums/role.enum'

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
  async createUser(@Request() req, @Body() newUser: any) {
    return this.usersService.createUser(newUser)
  }

  @UseGuards(AuthGuard)
  @Get('id/:id')
  async getById(@Param('id') id: number) {
    return this.usersService.getById(id)
  }
}
