/* eslint-disable @typescript-eslint/no-unused-vars */
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
    const payload = { username: user.username, sub: user.userId }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username)
    if (user && user.password === pass) {
      const { password, ...result } = user
      return result
    }
    return null
  }
}
