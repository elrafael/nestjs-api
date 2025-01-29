import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { compare } from 'bcrypt'
import { RolesService } from 'src/roles/roles.service'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entity/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  async getAll() {
    return this.repository.find()
  }

  async createUser(userDto: CreateUserDto) {
    try {
      const user = new User()
      user.login = userDto.login
      user.name = userDto.name
      user.password = userDto.password
      const role = await this.rolesService.getByName(userDto.role)
      user.role = role
      return this.repository.save(user)
    } catch (err) {
      throw err
    }
  }

  async getById(id: number) {
    return this.repository.findOneBy({
      id,
    })
  }

  async validateLogin(login: string, password: string): Promise<User | undefined> {
    try {
      const user = await this.repository.findOneOrFail({
        where: {
          login,
        },
        relations: ['role'],
      })
      if (user) {
        console.log('🚀 ~ UsersService ~ validateLogin ~ user:', user)
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
