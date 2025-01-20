import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as yaml from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  app.enableCors({
    origin: '*',
  });

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API endpoints and details')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document);

  // TODO: for some reasons yaml endpoint doesn\'t work by default
  app.getHttpAdapter().get('/api/yaml', (req, res) => {
    res.setHeader('Content-Type', 'application/x-yaml');
    res.send(yaml.dump(document));
  });

  console.log(`Application is running on: http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();
