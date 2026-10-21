
const { test, expect } = require('@playwright/test');

// Positive test case
test('GET /v2/pet/200 returns pet details', async ({ request }) => {
  const response = await request.get('https://petstore.swagger.io/v2/pet/200', {
    headers: {
      accept: 'application/json',
    },
  });

  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');

  const body = await response.json();
  expect(body.id).toBe(200);
  expect(body).toHaveProperty('name');
  expect(body).toHaveProperty('status');
});

// Negative test case
test('GET /v2/pet/999999999 returns error for non-existing pet', async ({ request }) => {
  const response = await request.get('https://petstore.swagger.io/v2/pet/999999999', {
    headers: {
      accept: 'application/json',
    },
  });

  expect(response.status()).toBe(404);
});