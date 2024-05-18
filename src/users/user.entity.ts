import { Column, Entity, ObjectId as ObjectIDType, ObjectIdColumn } from 'typeorm'

@Entity('users')
export class User {
  @ObjectIdColumn()
  _id: ObjectIDType

  @Column()
  name: string

  @Column()
  login: string

  @Column()
  password: string

  constructor(user?: Partial<User>) {
    Object.assign(this, user)
  }
}
