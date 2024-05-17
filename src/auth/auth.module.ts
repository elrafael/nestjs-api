import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { readFileSync } from 'fs'
import { UsersModule } from 'src/users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        privateKey: readFileSync(process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY, 'utf8'),
        publicKey: readFileSync(process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY, 'utf8'),
        signOptions: { expiresIn: '120m', algorithm: 'RS256' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
