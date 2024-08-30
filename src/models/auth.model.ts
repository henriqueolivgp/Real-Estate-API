import { z } from "zod";

const AuthRegisterSchema = z.object({
  name: z.string().min(4),
  company_name: z.string(),
  email: z.string(),
  phone: z.string().max(20),
  password: z.string().min(6),
  // company_id: z.coerce.number(),
  // role_id: z.coerce.number(),
});

type Register = z.infer<typeof AuthRegisterSchema>;

const AuthLoginSchema = z.object({
  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string',
  }).email(),
  password: z.string().min(6),
});

type Login = z.infer<typeof AuthLoginSchema>;

export { AuthRegisterSchema, Register, AuthLoginSchema, Login };
