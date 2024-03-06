import { FastifyInstance } from "fastify";
import { clientController } from "../controllers/client.Controller";

export async function clientRoutes( app: FastifyInstance){
    app.post( '/' , clientController.createExercise)
    app.post( '/edit' , clientController. alterOrderExercises)
    app.put( '/:id' , clientController. alterExercise)
    app.get( '/:id' , clientController. getExercise)
    app.delete( '/:id', clientController.deleteExercise)
}
