import { FastifyReply, FastifyRequest } from "fastify";
import jwt from 'jsonwebtoken'

// This function checks whether the user is logged in or not
export async function verifyAuth (req: FastifyRequest, res: FastifyReply){
  // In here we save the token inside cookies
  const token = req.cookies.token
  // if don't have token sends a error message saying 'Token not exist
  if(!token){
    return res.status(401).send({error: 'Token not exist'})
  }

  try {
    // We here decode the jwt(token) received with our scretkey(secretjwt)
    const decoded = jwt.verify(token, 'secretjwt')
    // if not found decoded returns a message 'user id not found'
    if(!decoded.sub){
      return res.status(401).send({error: 'User id not found'})
    }
    req.user = { id: String(decoded.sub) };
    // console.log(decoded.sub)
  } catch (error) {
    return res.status(401).send({error: 'Token invalide'})
  }
}