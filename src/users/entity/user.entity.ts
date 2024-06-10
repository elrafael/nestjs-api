import { Role } from 'src/roles/entity/role.entity'
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Relation } from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  login: string

  @Column()
  password: string

  @ManyToMany(() => Role)
  @JoinTable()
  role: Relation<Role>[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  constructor(user?: Partial<User>) {
    Object.assign(this, user)
  }
}
