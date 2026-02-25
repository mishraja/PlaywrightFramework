import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../utils/ApiHelper';
import Logger from '../../utils/Logger';

// Base URL for the API under test (JSONPlaceholder - Free fake API for testing and prototyping)
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('API Testing with ApiHelper', () => {
    let apiHelper: ApiHelper;

    test.beforeAll(() => {
        apiHelper = new ApiHelper(API_BASE_URL);
        Logger.info('Initialized ApiHelper for API tests');
    });

    test('GET - List Posts', async () => {
        const response = await apiHelper.get('/posts');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
        expect((response.data as any[]).length).toBeGreaterThan(0);
        Logger.info('GET /posts test passed');
    });

    test('POST - Create Post', async () => {
        const payload = {
            title: 'foo',
            body: 'bar',
            userId: 1
        };
        const response = await apiHelper.post('/posts', payload);
        expect(response.status).toBe(201);
        expect((response.data as any).title).toBe(payload.title);
        expect((response.data as any).body).toBe(payload.body);
        expect((response.data as any).userId).toBe(payload.userId);
        expect((response.data as any).id).toBeDefined();
        Logger.info('POST /posts test passed');
    });

    test('PUT - Update Post', async () => {
        const payload = {
            id: 1,
            title: 'foo updated',
            body: 'bar updated',
            userId: 1
        };
        const response = await apiHelper.put('/posts/1', payload);
        expect(response.status).toBe(200);
        expect((response.data as any).title).toBe(payload.title);
        Logger.info('PUT /posts/1 test passed');
    });

    test('DELETE - Delete Post', async () => {
        const response = await apiHelper.delete('/posts/1');
        expect(response.status).toBe(200); // JSONPlaceholder returns 200 for delete
        Logger.info('DELETE /posts/1 test passed');
    });
});
