import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

export const authService = {
  async userRegister(
    name: string,
    company_name: string,
    email: string,
    phone: string,
    password: string
  ) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

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
          password: hashedPassword,
          company_id: newCompany.company_id,
          role_id: role.role_id,
        },
      });

      return { newCompany, newAdmin };
    } catch (err) {
      console.error("Ocorred an error in user register: ", JSON.stringify(err));
      throw new Error("Error in user register");
    }
  },

  async loginUser(email: string, password: string) {
    try {
      // search a user peer email
      const user = await prisma.user.findUnique({ where: { email } });

      // 
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid email or password");
      }

      const token = jwt.sign({}, "secretjwt", { expiresIn: "1d", subject: user.user_id.toString() });

      return { token, user };
    } catch (error) {
      throw new Error("Ocorred an error in user login!!!");
    }
  },
};
