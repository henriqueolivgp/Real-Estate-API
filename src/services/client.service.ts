import { PrismaClient } from "@prisma/client";
import { Client } from "../models/client.models";

const prisma = new PrismaClient();

export const clientService = {
  async getAllClients(): Promise<Client[]> {
    try {
      const clients = await prisma.client.findMany();
      return clients;
    } catch (error) {
      console.error(
        "An error occurred when searching for all clients: ",
        error
      );
      throw new Error("Error searching for clients");
    }
  },

  async getClient(client_id: number) {
    try {
      const client = await prisma.client.findUnique({
        where: {
          client_id: client_id,
        },
      });
      return client;
    } catch (error) {
      console.error("Ocorreu um erro ao tetar encontrar a client: ", error);
      throw new Error("Erro ao update o client");
    }
  },

  async insertClient(company_name: string, name: string, email: string, phone: string, password: string) {
    try {
      const newCompany = await prisma.company.create({
        data: {
          company_name: company_name
        },
      });
  
      if (name == "") {
        console.log("INSERT THE NAME CLIENT!!!");
        throw new Error("Nome do cliente está vazio.");
      }
  
      // Verifica se o role_type fornecido existe
      // const existingRole = await prisma.role.findFirst({
      //   where: { role_type: role_type }
      // });
  
      // if (!existingRole) {
      //   throw new Error("O role_type fornecido não existe.");
      // }
  
      // Insere o novo cliente no banco de dados com o role_id correspondente ao role_type fornecido
      const newClient = await prisma.client.create({
        data: {
          name: name,
          email: email,
          phone: phone,
          password: password,
          company_id: newCompany.company_id,
        },
      });
  
      return newClient;
    } catch (error) {
      console.error("Ocorreu um erro ao inserir o cliente: ", error);
      throw new Error("Erro ao inserir o cliente");
    }
  },

  async updateClient(
    client_id: number,
    name?: string,
    email?: string,
    phone?: string
  ) {
    try {
      // Update the existent client
      const UpdateClient = await prisma.client.update({
        where: {
          client_id: client_id,
        },
        data: {
          name: name !== undefined ? name : undefined,
          email: email !== undefined ? email : undefined,
          phone: phone !== undefined ? phone : undefined,
        },
      });
      return UpdateClient;
    } catch (error) {
      console.error("Ocurred one error in update client: ", error);
      throw new Error("Error in update an client service");
    }
  },
  
  // Deleting an existing customer receives a customer ID to delete the customer
  async deleteClient(client_id: number) {
    try {
      return await prisma.client.delete({
        where: {
          client_id: client_id,
        },
      });
    } catch (error) {
      console.error("Ocurred one error in deleting client: ", error);
      throw new Error("Error in delete an client");
    }
  },
};
