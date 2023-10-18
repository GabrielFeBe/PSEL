import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module'; // Importe o AppModule do seu aplicativo
import { TransactionsService } from './transaction/transaction.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const transactionServiceMock = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Importe o AppModule aqui
    })
      .overrideProvider(TransactionsService)
      .useValue(transactionServiceMock)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it(`/GET hello`, () => {
    return request(app.getHttpServer())
      .get('/transactions') // Substitua com a rota que você deseja testar
      .expect(200)
      .expect('Hello, World!'); // Substitua com o resultado esperado
  });

  afterAll(async () => {
    await app.close();
  });
});
