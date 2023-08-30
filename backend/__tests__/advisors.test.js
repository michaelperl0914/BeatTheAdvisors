const request = require("supertest");
const app = require("../src/app"); // Import your Express app

describe("Advisors API", () => {
  it("should return something", async () => {
    const res = await request(app)
      .get("/advisors") // Update the route according to your API
      .send();

    // Check that the status code is 200
    expect(res.statusCode).toEqual(200);

    // Check that data is returned
    expect(res.body).not.toBeNull();
    expect(res.body).not.toBeUndefined();
  });

  it("should return an array", async () => {
    const res = await request(app)
      .get("/advisors") // Update the route according to your API
      .send();

    // Check that the response is an array
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("should catch errors", async () => {
    const res = await request(app)
      .get("/advisors/wrong") // Update the route according to your API
      .send();

    // Check that the status code is 404
    expect(res.statusCode).toEqual(404);

    // Check that the response is an array
    expect(Array.isArray(res.body)).toBeFalsy();
  });
});
