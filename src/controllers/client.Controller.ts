import { FastifyRequest, FastifyReply } from "fastify";
import { clientService } from "../services/client.service";
import {
  ClientSchema,
  ClientAllSchema,
  ClientIDSchema,
} from "../models/client.models";

export const clientController = {
  async verifyGetAllClients(req: FastifyRequest, res: FastifyReply) {
    try {
      const clients = await clientService.getAllClients();
      res.send(clients);
    } catch (error) {
      res.status(500).send({ error: "Error searching for clients" });
    }
  },

  async verifyGetClient(req: FastifyRequest, res: FastifyReply) {
    try {
      const { client_id } = ClientIDSchema.parse(req.params);

      const Client = await clientService.getClient(client_id);
      res.send(Client);
    } catch (error) {
      res.status(500).send({ error: "Error searching for Client" });
    }
  },

  async verifyInsertClient(req: FastifyRequest, res: FastifyReply) {
    try {
      const { company_name, name, email, phone, password } = ClientSchema.parse(
        req.body
      );

      await clientService.insertClient(
        company_name!,
        name,
        email,
        phone,
        password
      );

      res.send("Client inserted successfully");
    } catch (error) {
      res
        .status(500)
        .send({ error: "Error inserting client" } + JSON.stringify(error));
    }
  },

  async verifyUpdateClient(req: FastifyRequest, res: FastifyReply) {
    try {
      const { client_id } = ClientIDSchema.parse(req.params);
      const { name, email, phone } = ClientAllSchema.parse(req.body);

      await clientService.updateClient(client_id, name, email, phone);
      res.send("Client updated successfully");
    } catch (error) {
      res.status(500).send(JSON.stringify(error));
    }
  },

  async verifyDeleteClient(req: FastifyRequest, res: FastifyReply) {
    try {
      const { client_id } = ClientIDSchema.parse(req.params);

      await clientService.deleteClient(client_id);
      res.send("Client deleted successfully");
    } catch (error) {
      res.status(500).send("Error deleting client" + JSON.stringify(error));
    }
  },
};
