import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { hash, compare } from 'bcrypt'
import { ObjectId } from 'mongodb'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async getAll() {
    return this.repository.find()
  }

  async createUser(userDto: CreateUserDto) {
    const user = new User()
    user.login = userDto.login
    user.name = userDto.name
    user.password = await hash(userDto.password, +process.env.SALT_HASH)
    user.role = userDto.role
    return this.repository.save(user)
  }

  async getById(id: number) {
    return this.repository.findOneBy({
      _id: new ObjectId(id),
    })
  }

  async validateLogin(login: string, password: string): Promise<User | undefined> {
    try {
      const user = await this.repository.findOneByOrFail({
        login,
      })
      if (user) {
        const isMatch = await compare(password, user.password)

        if (isMatch) {
          return user
        }
      }
      return undefined
    } catch (error) {
      throw error
    }
  }
}
