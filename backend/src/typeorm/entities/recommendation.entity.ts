import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Recommendation extends BaseEntity {
  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.recommendations)
  user: User;

  @ApiProperty()
  @Column()
  userId: number;
}
