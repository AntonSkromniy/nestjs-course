import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Profile extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'int' })
  age: number;
}
