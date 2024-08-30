import { FastifyInstance } from 'fastify'
import { transationController } from '../controllers/transations.Controller'

export async function transactionRoutes(app: FastifyInstance){
  app.get( '/trasactions' , transationController.verifyGetAllTrasactions)
  app.get( '/trasaction/:trasaction_id' , transationController.verifyGetTrasaction)
  app.post( '/trasaction/insert' , transationController.verifyInsertTrasaction)
  app.put( '/trasaction/update' , transationController.verifyUpdateTrasaction)
  app.delete( '/trasaction/:trasaction_id', transationController.verifyDeleteTrasaction)
}
