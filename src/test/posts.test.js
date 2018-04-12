import request from 'supertest';
import app from '../index';

describe('post route', () => {
  afterEach(() => {
    app.server.close();
  });

  test('get all posts work', done => {
    request(app)
      .get('/api/v1/posts')
      .then(res => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  test('create post work', done => {
    request(app)
      .post('/api/v1/posts')
      .send({ username: 'JoshMatz', text: 'Hi' })
      .then(res => {
        expect(res.statusCode).toBe(201);
        done();
      });
  });

  test('Create post - not username', done => {
    request(app)
      .post('/api/v1/posts')
      .send({ username: '', text: 'Hi' })
      .then(res => {
        expect(res.statusCode).toBe(400);
        done();
      });
  });

  test('Create post - not text', done => {
    request(app)
      .post('/api/v1/posts')
      .send({ username: 'Ivan', text: '' })
      .then(res => {
        expect(res.statusCode).toBe(400);
        done();
      });
  });

  test('Create post - text too big than 200 symbols', done => {
    request(app)
      .post('/api/v1/posts')
      .send({
        username: 'Ivan',
        text:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
      })
      .then(res => {
        expect(res.statusCode).toBe(400);
        done();
      });
  });

  test('Create post - not text', done => {
    request(app)
      .post('/api/v1/posts')
      .send({ username: '/Ivan', text: 'How are you?' })
      .then(res => {
        expect(res.statusCode).toBe(400);
        done();
      });
  });
});
