import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user.old/user.service';
import { JWTModule } from './jwt-module';
import { ConfigModule } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), JWTModule],
      providers: [AuthService, UserService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate correct credentials', async () => {
    const res = await service.validateUser('john', 'changeme');
    expect(res.username).toEqual('john');
  });

  it('should invalidate incorrect credentials', async () => {
    const res = await service.validateUser('john', 'hhg');
    expect(res).toBeNull();
  });
});
