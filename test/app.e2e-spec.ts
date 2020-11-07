import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import supertest from 'supertest';

describe('App', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Query getHello', () => {
    it('should return query result', async () => {
      await supertest(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: {},
          query: `
            query {
              getHello
            }
          `,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.getHello).toBe('Hello World!');
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
