import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // @Public()
  // async login(@Request() req) {
  //   return this.authService.login(req.user)
  // }
}
