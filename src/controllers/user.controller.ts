import { FastifyRequest, FastifyReply } from "fastify";
import { userService } from "../services/user.service";
import {
  UserAllSchema,
  UserCompanySchema,
  UserSchema,
  UserIDSchema,
  UserWorkerSchema
} from "../models/user.model";

import { CompanySchema } from "../models/company.model";

export const userController = {
  async verifyGetAllUsers(req: FastifyRequest, res: FastifyReply) {
    try {
      const users = await userService.getAllUsers();
      res.send(users);
    } catch (error) {
      res.status(500).send({ error: "Error searching for admins" });
    }
  },

  async verifyGetAdmin(req: FastifyRequest, res: FastifyReply) {
    try {
      const { user_id } = UserIDSchema.parse(req.params);
      
      const Admin = await userService.getUser(user_id);
      res.send(Admin);
    } catch (error) {
      res.status(500).send({ error: "Error searching for Admin" });
    }
  },

  async verifyInsertUser(req: FastifyRequest, res: FastifyReply) {
    try {
      const { company_name, name, email, phone, password } =
        UserCompanySchema.parse(req.body);

      // call the insertClient with all extracted data
      await userService.insertUser(
        company_name,
        name,
        email,
        phone,
        password
      );
      res.send("Admin inserted successfully");
    } catch (error) {
      res
        .status(500)
        .send({ error: "Error inserting admin" + JSON.stringify(error) });
    }
  },

  async verifyInsertWorker(req: FastifyRequest, res: FastifyReply) {
    try {
      const { user_id } = UserIDSchema.parse(req.params);

      const { name, email, phone, password } =
      UserWorkerSchema.parse(req.body);

      // call the insertClient with all extracted data
      await userService.insertWorker(user_id, name, email, phone, password);
      res.send("Admin inserted successfully");
    } catch (error) {
      res
        .status(500)
        .send({ error: "Error inserting admin" + JSON.stringify(error) });
    }
  },

  async verifyUpdateUser(req: FastifyRequest, res: FastifyReply) {
    try {
      const { user_id } = UserIDSchema.parse(req.params);
      const { name, email, phone, password } = UserAllSchema.parse(req.body);

      await userService.updateUser(user_id, name, email, phone, password);
      res.send("Client updated successfully");
    } catch (error) {
      res.status(500).send(JSON.stringify(error));
    }
  },

  async verifyDeleteClient(req: FastifyRequest, res: FastifyReply) {
    try {
      const { user_id } = UserIDSchema.parse(req.params);

      await userService.deleteUser(user_id);
      res.send("Client deleted successfully");
    } catch (error) {
      res.status(500).send("Error deleting client" + JSON.stringify(error));
    }
  },
};
