const request = require("supertest");
const app = require("./server");

let token;

describe("Transaction API Test", () => {
  test("Login", async () => {
    const res = await request(app).post("/api/login").send({
      name: "Andi",
      password: "andi123",
    });

    expect(res.statusCode).toBe(200);
    token = res.body.data.token;
  });

  test("Add Transaction", async () => {
    const res = await request(app)
      .post("/api/trans/addtrans")
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "Test Add Transaction from Unit Test",
      });
    expect(res.status).toBe(201);
  });
});
