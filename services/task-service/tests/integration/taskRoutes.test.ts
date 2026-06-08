/// <reference types="jest" />
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { describe, test, expect } from '@jest/globals';
import app from '../../src/index';



const userId = '550e8400-e29b-41d4-a716-446655440000';
const token = jwt.sign({ id: userId, username: 'testuser' }, 'secret123');
let taskId: string;

describe('Task Routes Integration', () => {
  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
  });

  test('GET /tasks requires auth', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(401);
  });

  test('POST /tasks creates task', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test task', priority: 'high' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Test task');
    taskId = res.body.id;
    // Verify UUID format
    expect(taskId).toMatch(/^[0-9a-f-]{36}$/i);
  });

  test('GET /tasks returns user tasks', async () => {
    const res = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('PATCH /tasks/:id updates task', async () => {
    const res = await request(app)
      .patch(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ done: true });
    expect(res.status).toBe(200);
    expect(res.body.done).toBe(true);
  });

  test('DELETE /tasks/:id deletes task', async () => {
    const res = await request(app)
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});