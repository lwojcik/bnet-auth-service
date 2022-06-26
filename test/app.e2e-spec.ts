import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
// import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppModule (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    // TODO: create a factory here
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // it('/ (GET)', () =>
  //   request(app.getHttpServer()).get('/').expect(200).expect('Hello World!'));

  describe('Authorization enabled', () => {
    it.todo('/ (GET)');
    it.todo('/status (GET)');
    it.todo('/accesstoken (GET)');
    it.todo('/accesstoken?refresh=true (GET)');
  });

  describe('Authorization disabled', () => {
    it.todo('/ (GET)');
    it.todo('/status (GET)');
    it.todo('/accesstoken (GET)');
    it.todo('/accesstoken?refresh=true (GET)');
  });

  describe('Redis cache enabled', () => {
    it.todo('/ (GET)');
    it.todo('/status (GET)');
    it.todo('/accesstoken (GET)');
    it.todo('/accesstoken?refresh=true (GET)');
  });

  describe('Redis cache disabled', () => {
    it.todo('/ (GET)');
    it.todo('/status (GET)');
    it.todo('/accesstoken (GET)');
    it.todo('/accesstoken?refresh=true (GET)');
  });

  describe('HTTPS enabled', () => {
    it.todo('/ (GET)');
    it.todo('/status (GET)');
    it.todo('/accesstoken (GET)');
    it.todo('/accesstoken?refresh=true (GET)');
  });

  describe('HTTPS disabled', () => {
    it.todo('/ (GET)');
    it.todo('/status (GET)');
    it.todo('/accesstoken (GET)');
    it.todo('/accesstoken?refresh=true (GET)');
  });

  describe('Rate limiting enabled', () => {
    it.todo('/ (GET)');
    it.todo('/status (GET)');
    it.todo('/accesstoken (GET)');
    it.todo('/accesstoken?refresh=true (GET)');
  });

  describe('Rate limiting disabled', () => {
    it.todo('/ (GET)');
    it.todo('/status (GET)');
    it.todo('/accesstoken (GET)');
    it.todo('/accesstoken?refresh=true (GET)');
  });

  describe('CORS enabled', () => {
    it.todo('/ (GET)');
    it.todo('/status (GET)');
    it.todo('/accesstoken (GET)');
    it.todo('/accesstoken?refresh=true (GET)');
  });

  describe('CORS disabled', () => {
    it.todo('/ (GET)');
    it.todo('/status (GET)');
    it.todo('/accesstoken (GET)');
    it.todo('/accesstoken?refresh=true (GET)');
  });

  describe('Battle.net credentials configured', () => {
    it.todo('/ (GET)');
    it.todo('/status (GET)');
    it.todo('/accesstoken (GET)');
    it.todo('/accesstoken?refresh=true (GET)');
  });

  describe('Battle.net credentials not configured', () => {
    it.todo('/ (GET)');
    it.todo('/status (GET)');
    it.todo('/accesstoken (GET)');
    it.todo('/accesstoken?refresh=true (GET)');
  });
});
