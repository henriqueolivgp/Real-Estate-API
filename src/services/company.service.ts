import { PrismaClient } from "@prisma/client";
import { Company } from "../models/company.model";

const prisma = new PrismaClient();

export const companyService = {
  async getAllDataByCompanyId(companyId: number): Promise<{ agents: { agent_id: number }[]; clients: { client_id: number }[]; workers: { worker_id: number }[] } | null> {
    try {
      const company = await prisma.company.findUnique({
        where: {
          company_id: companyId,
        },
        select: {
          agents: {
            select: {
              agent_id: true,
            },
          },
          clients: {
            select: {
              client_id:true,
            },
          },
          workers: {
            select: {
              worker_id:true,
            },
          },
        },
      });
  
      return company;
    } catch (error) {
      console.error("An error occurred when searching for company data: ", error);
      throw new Error("Error searching for company data");
    }
  },
  
  // Deleting an existing customer receives a customer ID to delete the customer
  async deleteCompany(company_id: number) {
    try {
      return await prisma.company.delete({
        where: {
          company_id: company_id,
        },
      });
    } catch (error) {
      console.error("Ocurred one error in deleting client: ", error);
      throw new Error("Error in delete an client");
    }
  },
};
