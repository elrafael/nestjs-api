import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entity/user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { RolesModule } from 'src/roles/roles.module'

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolesModule],
  providers: [UsersService, JwtService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
