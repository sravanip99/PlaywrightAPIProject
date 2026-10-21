
const { test, expect } = require('@playwright/test');

// Positive test case
test('GET /v2/pet/{id} returns pet details', async ({ request }) => {
  const petId = Date.now();

  // Create a pet first
  const createResponse = await request.post(
    'https://petstore.swagger.io/v2/pet',
    {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        id: petId,
        name: 'Sravani Test Pet',
        photoUrls: [],
        tags: [],
        status: 'available',
      },
    }
  );

  expect(createResponse.status()).toBe(200);

  // Get the pet that was created
  const response = await request.get(
    `https://petstore.swagger.io/v2/pet/${petId}`,
    {
      headers: {
        accept: 'application/json',
      },
    }
  );

  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');

  const body = await response.json();

  expect(body.id).toBe(petId);
  expect(body.name).toBe('Sravani Test Pet');
  expect(body.status).toBe('available');
});

// Negative test case
test('GET /v2/pet/999999999 returns error for non-existing pet', async ({ request }) => {
  const response = await request.get(
    'https://petstore.swagger.io/v2/pet/999999999',
    {
      headers: {
        accept: 'application/json',
      },
    }
  );

  expect(response.status()).toBe(404);
});
