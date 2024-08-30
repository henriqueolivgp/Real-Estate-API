import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(4),
  email: z.string(),
  phone: z.string().max(20),
  // company_id: z.coerce.number(),
  // role_id: z.coerce.number(),
});

type User = z.infer<typeof UserSchema>;

const UserCompanySchema = z.object({
  company_name: z.string(),
  name: z.string().min(4),
  email: z.string(),
  phone: z.string().max(20),
  password: z.string().min(6),
  role_type: z.coerce.string().optional(),
});

type UserCompany = z.infer<typeof UserCompanySchema>;

const UserWorkerSchema = z.object({
  name: z.string().min(4),
  email: z.string(),
  phone: z.string().max(20),
  password: z.string().min(6),
  role_type: z.coerce.string().optional(),
});

type UserWorker = z.infer<typeof UserWorkerSchema>;

const UserAllSchema = z.object({
  // User_id: z.coerce.number().int().min(0),
  name: z.string().min(4),
  email: z.string(),
  phone: z.string().max(20),
  password: z.string().min(6),
  company_id: z.string(),
  role_id: z.coerce.string().optional(),
  // company_id: z.coerce.number(),
});

type UserAll = z.infer<typeof UserAllSchema>;

const UserIDSchema = z.object({
  user_id: z.coerce.number().int(),
});

type UserID = z.infer<typeof UserIDSchema>;

export { UserSchema, User, UserAll, UserAllSchema, UserCompanySchema, UserIDSchema, UserID, UserWorkerSchema };
