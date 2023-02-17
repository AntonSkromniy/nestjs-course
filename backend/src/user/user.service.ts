import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Profile, User } from '../typeorm';

@Injectable()
export class UserService
  extends TypeOrmCrudService<User>
  implements OnModuleInit
{
  constructor(
    @InjectRepository(User) repo,
    private dataSource: DataSource,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {
    super(repo);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.repo.findOneBy({ username });
  }

  async onModuleInit() {
    // // This method checks if the admin user exists in the database and if not, it creates and saves it.
    const existingUser = await this.repo.findOne({
      where: { username: 'admin', password: 'pancakes' },
    });

    if (existingUser) return;
    await this.dataSource.transaction(async (manager) => {
      const newProfile = await this.profileRepository.create({ age: 25 });
      const newProfileSaved = await manager.save(newProfile);

      const newUser = await this.repo.create({
        username: 'admin',
        password: 'pancakes',
        profile: newProfileSaved,
      });

      await manager.save(newUser);
    });
  }
}
