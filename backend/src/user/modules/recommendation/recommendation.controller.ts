import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { RecommendationService } from './recommendation.service';

import { Recommendation } from '../../../typeorm';
import { JWTAuthGuard } from '../../../auth/jwt-auth-guard';

@Crud({
  model: {
    type: Recommendation,
  },
  query: {
    softDelete: true,
    join: {
      user: {
        eager: true,
      },
    },
  },
  params: {
    userId: {
      field: 'userId',
      type: 'number',
    },
  },
  routes: {
    exclude: ['replaceOneBase', 'createManyBase'],
  },
})
@ApiTags('Recommendation')
@ApiBearerAuth()
@Controller('user/:userId/recommendation')
// @UseGuards(JWTAuthGuard)
export class RecommendationController
  implements CrudController<Recommendation>
{
  constructor(public service: RecommendationService) {}
}
