import { FastifyInstance } from "fastify";
import { companyController } from "../controllers/company.Controller";

export async function clientRoutes( app: FastifyInstance){
    // app.get( '/companies' , clientController.verifyGetAllClients)
    app.get( '/company/:company_id' , companyController.verifyGetClient)
    // app.post( '/company', clientController.verifyInsertClient)
    // app.put( '/company/:company_id' , clientController.verifyUpdateClient)
    app.delete( '/company/:company_id', companyController.verifyDeleteCompany)
}
