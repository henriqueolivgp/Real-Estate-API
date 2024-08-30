import { FastifyRequest, FastifyReply } from "fastify";
import { PropertieService } from "../services/propertie.service";
import {
  PropertieAllSchema,
  PropertieIDSchema,
  PropertieSchema,
} from "../models/properties.model";

export const propertyController = {
  async verifyGetAllProperties(req: FastifyRequest, res: FastifyReply) {
    try {
      const { allProperties, Properties } =
        await PropertieService.getAllProperties();

      const TotalProperties = Properties.length;

      if (TotalProperties) {
        res.send({ allProperties, TotalProperties });
      } else {
        res.send({ allProperties });
      }
    } catch (error) {
      res.status(500).send({ error: "Error searching for Properties" });
    }
  },

  async verifyGetPropertie(req: FastifyRequest, res: FastifyReply) {
    try {
      const { property_id } = PropertieIDSchema.parse(req.params);

      const Propertie = await PropertieService.getPropertie(property_id);
      res.send(Propertie);
    } catch (error) {
      res.status(500).send({ error: "Error searching for Propertie" });
    }
  },

  async verifyInsertPropertie(req: FastifyRequest, res: FastifyReply) {
    try {
      const { property_type, address, size, num_rooms, price, status } =
        PropertieSchema.parse(req.body);

      // call the insertPropertie with all extracted data
      await PropertieService.insertPropertie(
        property_type,
        address,
        size,
        num_rooms,
        price,
        status
      );

      res.send("Propertie inserted successfully");
    } catch (error) {
      res.status(500).send({ error: "Error inserting Propertie" });
    }
  },

  async verifyUpdatePropertie(req: FastifyRequest, res: FastifyReply) {
    try {
      const { property_id } = PropertieIDSchema.parse(req.params);
      const { property_type, address, size, num_rooms, price, status } =
        PropertieAllSchema.parse(req.body);

      await PropertieService.updatePropertie(
        property_id,
        property_type,
        address,
        size,
        num_rooms,
        price,
        status
      );

      res.send("Propertie updated successfully");
    } catch (error) {
      res
        .status(500)
        .send({ error: "Error updating Property" } + JSON.stringify(error));
    }
  },

  async verifyDeletePropertie(req: FastifyRequest, res: FastifyReply) {
    try {
      const { property_id } = PropertieIDSchema.parse(req.params);

      await PropertieService.deletePropertie(property_id);
      res.send("Propertie deleted successfully");
    } catch (error) {
      res.status(500).send("Error deleting Propertie");
    }
  },
};
