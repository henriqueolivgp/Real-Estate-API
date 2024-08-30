import { FastifyInstance } from "fastify";
import { clientRoutes } from "./client.routes";
import { propertyRoutes } from "./propertie.routes";
import { transactionRoutes } from "./transactions.routes";
import { usersRoutes } from "./user.routes";
import { authRoutes } from "./auth.routes";
import { verifyAuth } from "../middlewares/verifyAuth";

export async function routes(app: FastifyInstance) {
  await authRoutes(app);
  app.register(usersRoutes)

  // tudo o que esta aqui so funciona se tiver token criado
  app.register(async (app) => {
    app.addHook("preHandler", verifyAuth);
    app.register(clientRoutes)
    app.register(propertyRoutes)
    app.register(transactionRoutes)
  });
}
