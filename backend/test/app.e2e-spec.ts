import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let currentUserId: number;
  let newUserId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  // for successful login
  it('/auth/login (POST) for successful', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'admin', password: 'pancakes' });

    accessToken = response.body.access_token;
    expect(accessToken).toBeDefined();
  });

  // for failed login
  it('/auth/login (POST) for failed', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'wrong name', password: 'changeme' });

    expect(response.body.access_token).toBeUndefined();
  });

  it('/auth/profile (GET) for successful', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/profile')
      .set({ Authorization: `Bearer ${accessToken}` });

    currentUserId = response.body.userId;
    expect(response.statusCode).toEqual(200);
    expect(response.body.userId).toBeDefined();
  });

  it('/auth/profile (GET) for falied', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/profile')
      .set({ Authorization: `Bearer wrong_token` });

    expect(response.statusCode).toEqual(401);
  });

  it('/user:id (GET) for successful', async () => {
    const response = await request(app.getHttpServer())
      .get(`/user/${currentUserId}`)
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(response.body.userId).toEqual(currentUserId);
    expect(response.body.username).toBeDefined();
  });

  it('/user:id (GET) for falied', async () => {
    const response = await request(app.getHttpServer())
      .get(`/user/-1`)
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(response.body.userId).toBeUndefined();
  });

  it('/user (POST) for successful', async () => {
    const username = 'test user';
    const response = await request(app.getHttpServer())
      .post(`/user`)
      .send({ username, password: 'changeme' })
      .set({ Authorization: `Bearer ${accessToken}` });

    newUserId = response.body.userId;
    expect(response.statusCode).toEqual(201);
    expect(response.body.userId).toBeDefined();
    expect(response.body.username).toEqual(username);
  });

  it('/user (GET) for successful', async () => {
    const response = await request(app.getHttpServer())
      .get(`/user`)
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('/user/:id (PATCH) for successful', async () => {
    const username = 'changed user';
    const response = await request(app.getHttpServer())
      .patch(`/user/${newUserId}`)
      .send({ username })
      .set({ Authorization: `Bearer ${accessToken}` });

    console.log(response.body);
    expect(response.statusCode).toEqual(200);
    expect(response.body.username).toEqual(username);
  });

  it('/user/:id (DELETE) for successful', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/user/${newUserId}`)
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(response.statusCode).toEqual(200);
  });
});
