import { Controller, Get, UseGuards, Request, Post, Body, Param } from '@nestjs/common'
import { AuthGuard } from '../auth/guards/auth.guard'
import { UsersService } from './users.service'

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
  async createUser(@Request() req, @Body() newUser: any) {
    return this.usersService.createUser(newUser)
  }

  @UseGuards(AuthGuard)
  @Get('id/:id')
  async getById(@Param('id') id: number) {
    return this.usersService.getById(id)
  }
}
