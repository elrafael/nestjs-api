import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard'
import { AppService } from './app.service'
import { AuthService } from './auth/auth.service'
import { Public } from './decorators/public.decorator'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello() // will be removed
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @Public()
  async login(@Request() req) {
    return this.authService.login(req.user)
  }
}
