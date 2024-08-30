import { PrismaClient } from "@prisma/client";
import { User } from "../models/user.model";

const prisma = new PrismaClient();

export const userService = {
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      console.error("An error occurred when searching for all admins: ", error);
      throw new Error("Error searching for admins");
    }
  },

  async getUser(user_id: number) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          user_id: user_id,
        },
      });
      return user;
    } catch (error) {
      console.error("Ocorreu um erro ao tetar encontrar a user: ", error);
      throw new Error("Erro ao update o user");
    }
  },

  async insertUser(
    company_name: string,
    name: string,
    email: string,
    phone: string,
    password: string
  ) {
    try {
      const newCompany = await prisma.company.create({
        data: {
          company_name: company_name,
        },
      });

      // Check if the admin role exists or create it
      let role = await prisma.role.findFirst({
        where: {
          role_type: "admin",
        },
      });

      // if admin role_type not exists create role_type admin
      if (!role) {
        role = await prisma.role.create({
          data: {
            role_type: "admin",
          },
        });
      }

      // Insert new admin in database
      const newAdmin = await prisma.user.create({
        data: {
          name: name,
          email: email,
          phone: phone,
          password: password,
          company_id: newCompany.company_id,
          role_id: role.role_id,
        },
      });
      return { newCompany, newAdmin };
    } catch (error) {
      console.error("Ocorreu um erro ao inserir o user: ", error);
      throw new Error("Erro ao inserir o user");
    }
  },

  async insertWorker(
    userId: number,
    name: string,
    email: string,
    phone: string,
    password: string
  ) {
    try {
      // Obter o administrador logado
      const userAdmin = await prisma.user.findUnique({
        where: {
          user_id: userId,
        },
        include: {
          company: true, // Inclui as informações da empresa
        },
      });

      if (!userAdmin || !userAdmin.company || !userAdmin.company.company_id) {
        throw new Error(
          "User ou empresa do user não encontrada"
        );
      }

      // Check if the worker role exists or create it
      let role = await prisma.role.findFirst({
        where: {
          role_type: "worker",
        },
      });

      // if worker role_type not exists create role_type worker
      if (!role) {
        role = await prisma.role.create({
          data: {
            role_type: "worker",
          },
        });
      }

      // Insert new worker in database
      const newWorker = await prisma.user.create({
        data: {
          name: name,
          email: email,
          phone: phone,
          password: password,
          company_id: userAdmin.company.company_id,
          role_id: role.role_id,
        },
      });

      return { newWorker };
    } catch (error) {
      console.error("Ocorreu um erro ao inserir o trabalhador: ", error);
      throw new Error("Erro ao inserir o trabalhador");
    }
  },

  async updateUser(
    user_id: number,
    name?: string,
    email?: string,
    phone?: string,
    password?: string
  ) {
    try {
      // Update the existent client
      const UpdateUser = await prisma.user.update({
        where: {
          user_id: user_id,
        },
        data: {
          name: name !== undefined ? name : undefined,
          email: email !== undefined ? email : undefined,
          phone: phone !== undefined ? phone : undefined,
          password: password !== undefined ? password : undefined,
        },
      });
      return UpdateUser;
    } catch (error) {
      console.error("Ocurred one error in update user: ", error);
      throw new Error("Error in update an user service");
    }
  },

  // Deleting an existing customer receives a customer ID to delete the customer
  async deleteUser(user_id: number) {
    try {
      return await prisma.user.delete({
        where: {
          user_id: user_id,
        },
      });
    } catch (error) {
      console.error("Ocurred one error in deleting user: ", error);
      throw new Error("Error in delete an user");
    }
  },
};
