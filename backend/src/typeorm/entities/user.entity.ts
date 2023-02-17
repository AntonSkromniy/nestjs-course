import {
  Entity,
  Column,
  OneToMany,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';
import { Recommendation } from './recommendation.entity';
import { Perk } from './perk.entity';
import { Profile } from './profile.entity';

@Entity()
export class User extends BaseEntity {
  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty()
  @Column({ nullable: true })
  phone?: string;

  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  dob?: Date;

  @ApiProperty()
  @Column({ nullable: true })
  daysActive?: number;

  @ApiProperty({ type: () => Recommendation, isArray: true })
  @OneToMany(() => Recommendation, (recommendation) => recommendation.user)
  recommendations: Recommendation[];

  @ApiProperty({ type: () => Perk, isArray: true })
  @ManyToMany(() => Perk, (perk) => perk.users)
  perks: Perk[];

  @ApiProperty({ type: () => Profile })
  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
