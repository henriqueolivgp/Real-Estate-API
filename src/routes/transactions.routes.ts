import { FastifyInstance } from 'fastify'
import { transationController } from '../controllers/transations.controller'

export async function transactionRoutes(app: FastifyInstance){
  app.post( '/' , transationController.createExercise)
  app.post( '/edit' , transationController. alterOrderExercises)
  app.put( '/:id' , transationController. alterExercise)
  app.get( '/:id' , transationController. getExercise)
  app.delete( '/:id', transationController.deleteExercise)
}
