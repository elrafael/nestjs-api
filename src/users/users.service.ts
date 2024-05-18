import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { hash, compare } from 'bcrypt'
import { ObjectId } from 'mongodb'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async getAll() {
    return this.repository.find()
  }

  async createUser(newUser: User) {
    const user = new User()
    user.login = newUser.login
    user.name = newUser.name
    user.password = await hash(newUser.password, +process.env.SALT_HASH)
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
