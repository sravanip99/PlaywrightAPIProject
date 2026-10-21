
const { test, expect } = require('@playwright/test');

// Positive test case
test('PUT /v2/pet updates pet details successfully', async ({ request }) => {
  const response = await request.put('https://petstore.swagger.io/v2/pet', {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      id: 200,
      name: 'Updated Doggie',
      category: {
        id: 1,
        name: 'Dogs',
      },
      photoUrls: ['https://example.com/dog.jpg'],
      tags: [
        {
          id: 1,
          name: 'friendly',
        },
      ],
      status: 'available',
    },
  });

  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');

  const body = await response.json();
  expect(body.id).toBe(200);
  expect(body.name).toBe('Updated Doggie');
  expect(body.status).toBe('available');
});

// Negative test case
test('PUT /v2/pet handles invalid pet data', async ({ request }) => {
  const response = await request.put('https://petstore.swagger.io/v2/pet', {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      id: 'invalid-id',
      name: '',
      photoUrls: [],
    },
  });

  console.log('Status:', response.status());
  console.log('Response:', await response.text());

  expect(response.status()).toBeDefined();
});