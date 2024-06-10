import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: string
}
