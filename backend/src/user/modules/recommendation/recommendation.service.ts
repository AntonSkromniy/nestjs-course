import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Recommendation } from '../../../typeorm';

@Injectable()
export class RecommendationService extends TypeOrmCrudService<Recommendation> {
  constructor(@InjectRepository(Recommendation) repo) {
    super(repo);
  }
}
