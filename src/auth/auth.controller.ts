import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // login(@Body() sigInDto: Record<string, any>) {
  //   // return this.authService.signIn(sigInDto.username, sigInDto.password)
  // }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
