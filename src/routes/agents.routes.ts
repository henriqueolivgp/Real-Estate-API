import { FastifyInstance } from "fastify";
import { agentsController } from "../controllers/agents.Controller";

export async function agentsRoutes( app: FastifyInstance){
    app.post( '/' , agentsController.createExercise)
    app.post( '/edit' , agentsController. alterOrderExercises)
    app.put( '/:id' , agentsController. alterExercise)
    app.get( '/:id' , agentsController. getExercise)
    app.delete( '/:id', agentsController.deleteExercise)
}
