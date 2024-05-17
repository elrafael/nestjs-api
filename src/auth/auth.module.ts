import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from 'src/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { PassportModule } from '@nestjs/passport'
import * as fs from 'fs'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        privateKey: fs.readFileSync(process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY, 'utf8'),
        publicKey: fs.readFileSync(process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY, 'utf8'),
        signOptions: { expiresIn: '120m', algorithm: 'RS256' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
