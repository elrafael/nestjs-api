import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: any): Promise<any> {
    const roles = user?.role.map((r) => r.name)
    const payload = { username: user.login, sub: user.id, roles }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async validateUser(username: string, pass: string): Promise<any> {
    return this.usersService.validateLogin(username, pass)
  }
}
