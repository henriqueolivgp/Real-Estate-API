import fastify from "fastify";
import { routes } from "./routes/routes";
import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
// swagger docs
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifySwagger from "@fastify/swagger";
import fs from "fs";
import path from "path";

// import userPlugin from './plugins/user';
// variaveis de ambiente
import * as dotenv from 'dotenv';
dotenv.config();

// imports for auth
// import fjwt, { FastifyJWT } from '@fastify/jwt'
// import fCookie from '@fastify/cookie'
// import { authenticate } from "./middlewares/check-user-session";


const app = fastify();

app.register(fastifyCors, {
  origin: "http://localhost:5173", // URL do seu frontend
  credentials: true, // Permitir envio de cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permite apenas esses métodos
});

app.register(fastifyCookie)

// app.register(userPlugin);

// Carregar a configuração do Swagger do arquivo JSON
const swaggerConfigPath = path.join(__dirname, "../src/SwaggerConfig/swaggerConfig.json");
let swaggerConfig;

try {
  // 
  swaggerConfig = JSON.parse(fs.readFileSync(swaggerConfigPath, "utf8"));
  console.log('Swagger configuration loaded successfully');
} catch (err) {
  console.error('Error loading Swagger configuration:', err);
  process.exit(1);  // Saída com erro se não for possível carregar o arquivo
}

app.get("/", async (req, res) => {
  return "Welcome Api";
});


// Registrar o plugin fastify-swagger primeiro
app.register(fastifySwagger, {
  swagger: swaggerConfig.swagger
});

// Registrar o plugin fastify-swagger-ui em seguida
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: (request, reply, next) => { next(); },
    preHandler: (request, reply, next) => { next(); }
  },
});

app.register(routes).then(() => {
  console.log('Routes registered');
});


export default app;
