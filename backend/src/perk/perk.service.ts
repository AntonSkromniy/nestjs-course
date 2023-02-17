import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Perk } from '../typeorm';

@Injectable()
export class PerkService implements OnModuleInit {
  constructor(
    @InjectRepository(Perk)
    private readonly perkRepository: Repository<Perk>,
  ) {}

  async onModuleInit() {
    const perks = ['super', 'mega', 'ultra'];

    for (const description of perks) {
      const existingPerk = await this.perkRepository.findOne({
        where: { description },
      });

      if (existingPerk) return;

      await this.perkRepository.save({ description });
    }
  }
}
