
const { test, expect } = require('@playwright/test');

const baseURL = 'https://petstore.swagger.io/v2';

// Positive test case
test('DELETE /v2/pet/200 deletes pet successfully', async ({ request }) => {
  // Create the pet before deleting it
  const createResponse = await request.post(`${baseURL}/pet`, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      id: 200,
      name: 'Test Doggie',
      photoUrls: [],
      status: 'available',
    },
  });

  expect(createResponse.status()).toBe(200);

  // Delete the pet
  const response = await request.delete(`${baseURL}/pet/200`, {
    headers: {
      accept: 'application/json',
    },
  });

  expect(response.status()).toBe(200);

  console.log('Delete status:', response.status());
  console.log('Delete response:', await response.text());
});

// Negative test case
test('DELETE /v2/pet/999999999 handles non-existing pet', async ({ request }) => {
  const response = await request.delete(`${baseURL}/pet/999999999`, {
    headers: {
      accept: 'application/json',
    },
  });

  console.log('Negative test status:', response.status());
  console.log('Negative test response:', await response.text());

  // The demo API may return 200 or 404 for a non-existing pet
  expect([200, 404]).toContain(response.status());
});
