import { FastifyInstance } from "fastify";
import { clientController } from "../controllers/client.Controller";
import { verifyRoles } from "../middlewares/verifyRoles";
// import { checkSessionIdExists } from "./../middlewares/check-user-session";

export async function clientRoutes(app: FastifyInstance) {
  app.get("/clients",{preHandler: verifyRoles(['admin'])}, clientController.verifyGetAllClients);
  app.get("/client/:client_id", clientController.verifyGetClient);
  app.post("/client", clientController.verifyInsertClient);
  app.put("/client/:client_id", clientController.verifyUpdateClient);
  app.delete("/client/:client_id", clientController.verifyDeleteClient);
}
