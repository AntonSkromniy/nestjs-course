import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User, Profile } from '../typeorm';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private dataSource: DataSource,
  ) {}

  async onModuleInit() {
    // // This method checks if the admin user exists in the database and if not, it creates and saves it.
    const existingUser = await this.userRepository.findOne({
      where: { username: 'admin', password: 'pancakes' },
    });

    if (existingUser) return;
    await this.dataSource.transaction(async (manager) => {
      const newProfile = await this.profileRepository.create({ age: 25 });
      const newProfileSaved = await manager.save(newProfile);

      const newUser = await this.userRepository.create({
        username: 'admin',
        password: 'pancakes',
        profile: newProfileSaved,
      });

      await manager.save(newUser);
    });
  }

  async findOne(
    usernameOrId: any,
    by: 'username' | 'userId',
  ): Promise<User | undefined> {
    return by === 'username'
      ? await this.userRepository.findOneBy({ username: usernameOrId })
      : await this.userRepository.findOneBy({ id: usernameOrId });
  }
}
