import { Injectable } from '@nestjs/common'
import { Role } from './entity/role.entity'
import { In, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  getByName(name: string[]) {
    return this.repository.find({
      where: {
        name: In(name),
      },
    })
  }
}
