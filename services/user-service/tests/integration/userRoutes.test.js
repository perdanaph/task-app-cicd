const request = require('supertest');
const app = require('../../index');

describe('User Routes Integration', () => {
  // Simpan token untuk dipakai test berikutnya
  let authToken;

  // Register user sekali sebelum semua test
  beforeAll(async () => {
    await request(app)
      .post('/users/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
  });

  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('POST /users/register → 201', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({
        username: 'newuser',
        email: 'new@example.com',
        password: 'password123'
      });
    expect(res.status).toBe(201);
    expect(res.body.username).toBe('newuser');
  });

  test('POST /users/register → 409 duplicate email', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({
        username: 'testuser2',
        email: 'test@example.com',  // email yang sudah ada
        password: 'password123'
      });
    expect(res.status).toBe(409);
  });

  test('POST /users/login → 200 with token', async () => {
    // Debug — lihat dulu semua user yang ada
    const usersRes = await request(app).get('/users');

    // Debug — lihat response login
    const res = await request(app)
      .post('/users/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    authToken = res.body.token;
  });

  test('POST /users/login → 401 wrong password', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword'
      });
    expect(res.status).toBe(401);
  });

  test('GET /users → 200 list users', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});