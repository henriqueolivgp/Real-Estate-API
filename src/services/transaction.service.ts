import { PrismaClient, Prisma } from "@prisma/client";
import { Transaction } from "../models/trasactions.model";

import { v4 as uuidv4 } from 'uuid';

type UUID = string;

const newUUID: UUID = uuidv4();

const prisma = new PrismaClient();

export const TransactionService = {
  async getAllTrasaction(): Promise<Transaction[]> {
    try {
      const agents = await prisma.transaction.findMany();

      return agents;
    } catch (error) {
      console.error(
        "An error occurred when searching for all transactions: ",
        error
      );
      throw new Error("Error searching for transactions");
    }
  },

  async getTrasaction(transaction_id: number) {
    try {
      const propertie = await prisma.transaction.findUnique({
        where: {
          transaction_id: transaction_id,
        },
      });
      return propertie;
    } catch (error) {
      console.error(
        "Ocorreu um erro ao tetar encontrar a transaction: ",
        error
      );
      throw new Error("Erro ao update transaction");
    }
  },

  async insertTrasaction(
    property_id: number,
    client_id: UUID,
    agent_id: number,
    transaction_type: string,
    transaction_date: Date,
    price: Prisma.Decimal
  ) {
    try {
      await prisma.transaction.create({
        data: {
          property: {
            connect: {
              property_id: property_id,
            }, // Associating the property by ID
          },
          client: {
            connect: {
              client_id: client_id,
            }, // Associating the client by ID
          },
          agent: {
            connect: {
              agent_id: agent_id,
            }, // Associating the agent by ID
          },
          transaction_type: transaction_type,
          transaction_date: transaction_date,
          price: price,
        },
      });
    } catch (error) {
      console.error("An error occurred when inserting transaction: ", error);
      throw new Error("Error inserting transaction in service");
    }
  },

  async updateTrasaction(
    transaction_id: number,
    transaction_type: string,
    transaction_date: Date,
    price: Prisma.Decimal
  ) {
    try {
      const newAgent = await prisma.transaction.update({
        where: {
          transaction_id: transaction_id,
        },
        data: {
          transaction_type: transaction_type,
          transaction_date: transaction_date,
          price: price,
        },
      });
      return newAgent;
    } catch (error) {
      console.error("Ocorreu um erro ao update o agent: ", error);
      throw new Error("Erro ao update o agent");
    }
  },

  async deletePTrasaction(transaction_id: number) {
    try {
      return await prisma.transaction.delete({
        where: {
          transaction_id: transaction_id,
        },
      });
    } catch (error) {
      console.error("Ocorreu um erro ao deletar o agent: ", error);
      throw new Error("Erro ao inserir o agent");
    }
  },
};
