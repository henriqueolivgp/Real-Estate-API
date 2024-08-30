import { FastifyInstance } from "fastify";
import { userController } from "../controllers/user.controller";
import { verifyRoles } from "../middlewares/verifyRoles";

export async function usersRoutes( app: FastifyInstance){
    app.get( '/users' ,{ preHandler: verifyRoles(['admin'])}, userController.verifyGetAllUsers) // refazer service e controller para procurar so pelo company_id
    app.get( '/user/:user_id', userController.verifyGetAdmin)
    app.post( '/admin' , { preHandler: verifyRoles(['admin'])}, userController.verifyInsertUser)
    app.post( '/register/worker/:user_id', { preHandler: verifyRoles(['admin'])}, userController.verifyInsertWorker)
    app.put( '/admin/update', { preHandler: verifyRoles(['admin'])}, userController.verifyUpdateUser)
    app.delete( '/admin/:admin_id', { preHandler: verifyRoles(['admin'])}, userController.verifyDeleteClient)
}
