import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { JwtService } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, JwtService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
