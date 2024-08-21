// tests/app.test.js
import request from 'supertest';
import app from './index.js'; // Correct path to import the app

describe('Express App', () => {
  it('should respond with a 404 status for an unknown route', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.statusCode).toBe(404);
  });

  it('should handle file uploads', async () => {
    const response = await request(app)
      .post('/api/upload') // Ensure this route exists in your API
      .attach('file', Buffer.from('Test file content'), 'test.txt');
    
    expect(response.statusCode).toBe(200); // Adjust based on expected response
    expect(response.body.success).toBe(true); // Adjust based on expected response
  });

  it('should use CORS with the correct options', async () => {
    const response = await request(app)
      .get('/api') // Adjust based on a valid route in your API
      .set('Origin', 'http://localhost:5173');
    
    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:5173');
  });

  it('should use helmet for security headers', async () => {
    const response = await request(app).get('/api'); // Adjust based on a valid route in your API
    expect(response.headers['x-content-type-options']).toBe('nosniff');
    expect(response.headers['x-dns-prefetch-control']).toBe('off');
    expect(response.headers['x-frame-options']).toBe('SAMEORIGIN');
  });

  it('should handle errors properly', async () => {
    app.use('/api/trigger-error', (req, res, next) => {
      const error = new Error('Test error');
      error.status = 400;
      next(error);
    });

    const response = await request(app).get('/api/trigger-error');
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Test error');
  });
});
