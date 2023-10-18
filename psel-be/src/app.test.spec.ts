import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';

describe('AppController (e2e), only for UNAUTHORIZED and to check if it exists', () => {
  let app: INestApplication;
  // const transactionServiceMock = { findAll: () => ['test'] };
  // const accountServiceMock = { findAll: () => ['test'] };
  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it(`/GET transactions`, () => {
    return request(app.getHttpServer())
      .get('/transactions')
      .expect(401)
      .expect({ message: 'Unauthorized', statusCode: 401 }); // Substitua com o resultado esperado
  });
  it(`/POST transactions`, () => {
    return request(app.getHttpServer())
      .post('/transactions')
      .expect(401)
      .expect({ message: 'Unauthorized', statusCode: 401 }); // Substitua com o resultado esperado
  });
  it(`/PATCH transactions`, () => {
    return request(app.getHttpServer())
      .patch('/transactions/1')
      .expect(401)
      .expect({ message: 'Unauthorized', statusCode: 401 }); // Substitua com o resultado esperado
  });
  // in accounts route the post is public so it doesn't need to be tested;
  it(`/GET accounts`, () => {
    return request(app.getHttpServer())
      .get('/accounts')
      .expect(401)
      .expect({ message: 'Unauthorized', statusCode: 401 }); // Substitua com o resultado esperado
  });
  it(`/PATCH accounts`, () => {
    return request(app.getHttpServer())
      .patch('/accounts')
      .expect(401)
      .expect({ message: 'Unauthorized', statusCode: 401 }); // Substitua com o resultado esperado
  });
  it('/DELETE accounts', () => {
    return request(app.getHttpServer())
      .delete('/accounts')
      .expect(401)
      .expect({ message: 'Unauthorized', statusCode: 401 }); // Substitua com o resultado esperado
  });

  afterAll(async () => {
    await app.close();
  });
});
