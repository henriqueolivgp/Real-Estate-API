import { FastifyRequest, FastifyReply } from "fastify";
import { TransactionService } from "../services/transaction.service";
import {
  TransactionAllSchema,
  TransactionIDSchema,
  TransactionSchema,
} from "../models/trasactions.model";

export const transationController = {

  async verifyGetAllTrasactions(req: FastifyRequest, res: FastifyReply) {
    try {
      const Trasactions = await TransactionService.getAllTrasaction();
      res.send(Trasactions);
    } catch (error) {
      res.status(500).send({ error: "Error searching for Trasactions" });
    }
  },

  async verifyGetTrasaction(req: FastifyRequest, res: FastifyReply) {
    try {
      const { transaction_id } = TransactionIDSchema.parse(req.params);

      const Trasaction = await TransactionService.getTrasaction(transaction_id);
      res.send(Trasaction);
    } catch (error) {
      res.status(500).send({ error: "Error searching for Trasaction" });
    }
  },

  async verifyInsertTrasaction(req: FastifyRequest, res: FastifyReply) {
    try {
      const {
        property_id,
        client_id,
        agent_id,
        transaction_type,
        transaction_date,
        price,
      } = TransactionSchema.parse(req.body);

      // call the insertTrasaction with all extracted data
      await TransactionService.insertTrasaction(
        property_id,
        client_id,
        agent_id,
        transaction_type,
        transaction_date,
        price
      );

      res.send("Trasaction inserted successfully");
    } catch (error) {
      res.status(500).send({ error: "Error inserting Trasaction" + JSON.stringify(error)});
    }
  },

  async verifyUpdateTrasaction(req: FastifyRequest, res: FastifyReply) {
    try {
      const { transaction_id, transaction_type, transaction_date, price } =
        TransactionAllSchema.parse(req.body);

      await TransactionService.updateTrasaction(
        transaction_id,
        transaction_type,
        transaction_date,
        price
      );

      res.send("Trasaction updated successfully");
    } catch (error) {
      res.status(500).send({ error: "Error updating Trasaction" });
    }
  },

  async verifyDeleteTrasaction(req: FastifyRequest, res: FastifyReply) {
    try {
      const { transaction_id } = TransactionIDSchema.parse(req.params);

      await TransactionService.deletePTrasaction(transaction_id);
      res.send("Trasaction deleted successfully");
    } catch (error) {
      res.status(500).send("Error deleting Trasaction");
    }
  },
};
