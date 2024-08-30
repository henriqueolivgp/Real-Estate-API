import { FastifyRequest, FastifyReply } from "fastify";
import { companyService } from "../services/company.service";
import {
Company,
CompanyID,
CompanyIDSchema,
CompanySchema
} from "../models/company.model";

export const companyController = {
  // async verifyGetAllClients(req: FastifyRequest, res: FastifyReply) {
  //   try {
  //     const clients = await companyService.getAllClients();
  //     res.send(clients);
  //   } catch (error) {
  //     res.status(500).send({ error: "Error searching for clients" });
  //   }
  // },

  async verifyGetClient(req: FastifyRequest, res: FastifyReply) {
    try {
      const { company_id } = CompanyIDSchema.parse(req.params);

      const Company = await companyService.getAllDataByCompanyId(company_id);
      res.send(Company);
    } catch (error) {
      res.status(500).send({ error: "Error searching for Client" });
    }
  },

  // async verifyInsertClient(req: FastifyRequest, res: FastifyReply) {
  //   try {
  //     const { name, email, phone } = ClientSchema.parse(req.body);

  //     // call the insertClient with all extracted data
  //     await companyService.insertClient(name, email, phone);
  //     res.send("Client inserted successfully");
  //   } catch (error) {
  //     res.status(500).send({ error: "Error inserting client"});
  //   }
  // },
  
  async verifyDeleteCompany(req: FastifyRequest, res: FastifyReply) {
    try {
      const { company_id } = CompanyIDSchema.parse(req.params);

      await companyService.deleteCompany(company_id);
      res.send("Client deleted successfully");
    } catch (error) {
      res.status(500).send("Error deleting client" + JSON.stringify(error));
    }
  },

};
