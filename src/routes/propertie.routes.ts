import { FastifyInstance } from "fastify";
import { propertyController } from "../controllers/property.Controller";
import { verifyRoles } from "../middlewares/verifyRoles";

export async function propertyRoutes( app: FastifyInstance){
    app.get( '/properties' , {preHandler: verifyRoles(['admin', 'worker', 'agent', 'client'])}, propertyController.verifyGetAllProperties)
    app.get( '/property/:property_id', {preHandler: verifyRoles(['admin', 'worker'])}, propertyController.verifyGetPropertie)
    app.post( '/property', {preHandler: verifyRoles(['admin', 'worker'])}, propertyController.verifyInsertPropertie)
    app.put( '/property/:property_id', {preHandler: verifyRoles(['admin', 'worker'])}, propertyController.verifyUpdatePropertie)
    app.delete( '/property/:property_id', {preHandler: verifyRoles(['admin', 'worker'])}, propertyController.verifyDeletePropertie)
}