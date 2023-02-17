import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule, utilities as nestWinsonUtilities } from 'nest-winston';
import { transports } from 'winston';

const { PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: WinstonModule.createLogger({
      transports: [
        new transports.Console({
          level: 'silly',
          format: nestWinsonUtilities.format.nestLike(),
        }),
      ],
    }),
  });
  const config = new DocumentBuilder()
    .setTitle('Hr Eyes API')
    .setDescription('The NestJS API')
    // .setVersion('1.0')
    // .addTag('nestjs')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(PORT).then((res) => {
    if (res) {
      console.log('\x1b[34m', `Server is running on port ${PORT}`);
    }
  });
}

bootstrap();
