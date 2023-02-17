import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const JWTModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
  }),
});
