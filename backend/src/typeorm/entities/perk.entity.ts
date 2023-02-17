import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Perk extends BaseEntity {
  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty({ type: User, isArray: true })
  @ManyToMany(() => User, (user) => user.perks)
  @JoinTable({ name: 'perks_users' })
  users: User[];
}
