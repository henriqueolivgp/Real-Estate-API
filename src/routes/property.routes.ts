import { FastifyInstance } from "fastify";
import { propertyController } from "../controllers/property.Controller";

export async function properyRoutes( app: FastifyInstance){
    app.post( '/' , propertyController.createExercise)
    app.post( '/edit' , propertyController. alterOrderExercises)
    app.put( '/:id' , propertyController. alterExercise)
    app.get( '/:id' , propertyController. getExercise)
    app.delete( '/:id', propertyController.deleteExercise)
}
