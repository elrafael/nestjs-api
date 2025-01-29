import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common'
import { Roles } from 'src/decorators/roles.decorator'
import { Role } from 'src/enums/role.enum'
import { AuthGuard } from '../auth/guards/auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
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
  @Roles(Role.Admin)
  @Post('create')
  async createUser(@Request() req, @Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto) //
  }

  @UseGuards(AuthGuard)
  @Get('id/:id')
  @Roles(Role.Admin)
  async getById(@Param('id') id: number) {
    return this.usersService.getById(id)
  }
}
