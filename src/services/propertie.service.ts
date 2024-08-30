import { PrismaClient, Prisma } from "@prisma/client";
import { Propertie } from "../models/properties.model";

const prisma = new PrismaClient();

export const PropertieService = {
  async getAllProperties(): Promise<{
    allProperties: Propertie[];
    Properties: Propertie[];
  }> {
    try {
      const allProperties = await prisma.property.findMany();
      const Properties = await prisma.property.findMany();

      return { allProperties, Properties };
    } catch (error) {
      console.error(
        "An error occurred when searching for all Properties: ",
        error
      );
      throw new Error("Error searching for Properties");
    }
  },

  async getPropertie(property_id: number) {
    try {
      const propertie = await prisma.property.findUnique({
        where: {
          property_id: property_id,
        },
      });
      return propertie;
    } catch (error) {
      console.error("Ocorreu um erro ao tetar encontrar a propertie: ", error);
      throw new Error("Erro ao update o agent");
    }
  },

  async insertPropertie(
    property_type: string,
    address: string,
    size: number,
    num_rooms: number,
    price: Prisma.Decimal,
    status: string,
    client_id: number,
    company_id: number
  ) {
    try {
      // This take the company_id
      const newCompany = await prisma.company.findUnique({
        where: {
          company_id: company_id,
        },
      });

      // This take the client_id
      const clientID = await prisma.client.findUnique({
        where: {
          client_id: client_id,
        },
      });

      // Verify if exist client_id or company_id
      if (!newCompany || !clientID) {
        throw new Error(
          "ClientId or CompanyId not found contact admin or support!!!"
        );
      }

      await prisma.property.create({
        data: {
          property_type: property_type,
          address: address,
          size: size,
          num_rooms: num_rooms,
          price: price,
          status: status,
          client: {
            connect: {
              client_id: clientID.client_id,
            },
          },
          company: {
            connect: {
              company_id: newCompany.company_id,
            },
          },
        },
      });
    } catch (error) {
      console.error("An error occurred when inserting agent: ", error);
      throw new Error("Error inserting agent");
    }
  },

  async updatePropertie(
    property_id: number,
    property_type?: string,
    address?: string,
    size?: number,
    num_rooms?: number,
    price?: Prisma.Decimal,
    status?: string
  ) {
    try {
      const newAgent = await prisma.property.update({
        where: {
          property_id: property_id,
        },
        data: {
          property_type:
            property_type !== undefined ? property_type : undefined,
          address: address !== undefined ? address : undefined,
          size: size !== undefined ? size : undefined,
          num_rooms: num_rooms !== undefined ? num_rooms : undefined,
          price: price !== undefined ? price : undefined,
          status: status !== undefined ? status : undefined,
        },
      });
      return newAgent;
    } catch (error) {
      console.error("Ocorreu um erro ao update o agent: ", error);
      throw new Error("Erro ao update o agent");
    }
  },

  async deletePropertie(property_id: number) {
    try {
      return await prisma.property.delete({
        where: {
          property_id: property_id,
        },
      });
    } catch (error) {
      throw new Error("Ocurred an Error trying delete an property!!!" + error);
    }
  },
};
