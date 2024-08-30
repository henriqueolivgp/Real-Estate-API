import request from "supertest";
import app from "../app";

let server: string;

beforeAll(async () => {
  server = await app.listen(); // start server before all functions
});

afterAll(async () => {
  await app.close(); // stop server after end all functions
});

describe("Testing a rota POST ", () => {
  test("Deve retornar um objeto JSON com o usuário correto quando fornecido um ID válido", async () => {
    const UserData = {
      name: "henry",
      email: "henry@gmail.com",
      phone: "111222333",
    };

    const response = await request(server)
      .post(`/client/insert`)
      .send(UserData);

    expect(response.status).toBe(200);
  });

  // test("You should return status 400 if you find the same phone number in the database", async () => {
  //   const response = await request(server).post(`/client/insert`).send({
  //     name: "Test User",
  //     email: "test@example.com",
  //     phone: "752141725",
  //   });

  //   expect(response.status).toBe(404);
  // });

});

describe("Testing GET /clients", () => {
  test("Should response with 200 status code and one list of clients", async () => {
    // Use HTTP server with Supertest for routes
    const response = await request(server).get("/clients");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("client_id");
  });

  test("Should response with 400 status code if can't find clients", async () => {
    const response = await request(server).get(`/clients`);

    expect(response.status).toBe(400);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("Testing GET by ID route", () => {
  test("Should return an JSON object with correct client when supplied one valid ID", async () => {
    const response = await request(server).get(`/client/1`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      client_id: expect.any(Number),
      name: expect.any(String),
      email: expect.any(String),
      phone: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
    // console.log(response.body);
  });

  test("Should return a status 404 if dont have an especific client to get in this case is client_id = 2", async () => {
    const response = await request(server).get("/cliient/2");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("Deve retornar status 404 quando fornecido um ID inválido", async () => {
    const id = "999"; // Substitua '999' por um ID inválido
    const response = await request(server).get(`/client/${id}`);

    expect(response.status).toBe(404);
  });
});
