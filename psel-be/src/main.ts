import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('PSel examples')
    .setDescription(
      'This is an api made to be used in a payment system, where it is possible to create accounts and transactions, and set the cashback for those transactions.',
    )
    .setVersion('1.0')
    .addTag('accounts', 'transactions')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
