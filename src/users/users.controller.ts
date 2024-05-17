import { Controller, Get, UseGuards, Request } from '@nestjs/common'
import { AuthGuard } from '../auth/guards/auth.guard'

@Controller('users')
export class UsersController {
  constructor() {}

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log('🚀 ~ UsersController ~ getProfile ~ req.user:', req.user)
    return req.user
  }
}
