import { FastifyRequest, FastifyReply } from "fastify";
import { authService } from "../services/auth.service";
import {
  AuthRegisterSchema,
  Register,
  AuthLoginSchema,
  Login,
} from "../models/auth.model";

export const authController = {
  async verifyRegister(req: FastifyRequest, res: FastifyReply) {
    try {
      const { name, company_name, email, phone, password } =
        AuthRegisterSchema.parse(req.body);
        console.log(req.body)
        
      const userRegisted = await authService.userRegister(
        name,
        company_name,
        email,
        phone,
        password
      );
      res.send(userRegisted);
    } catch (err) {
      res
        .status(500)
        .send({ error: "Error in register user" + JSON.stringify(err) });
    }
  },

  async verifyLogin(req: FastifyRequest, res: FastifyReply) {
    try {
      const { email, password } = AuthLoginSchema.parse(req.body);
      const body = await authService.loginUser(
        email,
        password
      );
      // return {code: 200, body}
      return res.setCookie('token', body.token, { path: '/', httpOnly: true, secure: true }).status(200).send(body)
    } catch (err) {
      res.status(401).send({ error: err });
    }
  },

  async verifyLogout(req: FastifyRequest, res: FastifyReply) {
    try {
      // Delete the from inside the cookie
      return res.clearCookie('token', { path: '/' }).status(200).send({ message: 'Logout successful' });
    } catch (err) {
      res.status(500).send({ error: 'Failed to logout' });
    }
  }
};
