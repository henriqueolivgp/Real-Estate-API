import { z } from 'zod';

const ClientSchema = z.object({
  company_name: z.string().optional(),
  name: z.string().min(4),
  email: z.string(),
  phone: z.string().max(20),
  password: z.string().min(6),
  company_id: z.coerce.number(),
});

type Client = z.infer<typeof ClientSchema>;

const ClientAllSchema = z.object({
  // client_id: z.coerce.number().int().min(0),
  name: z.string().min(4).optional(),
  email: z.string().optional(),
  phone: z.string().max(20).optional(),
  password: z.string().min(6)

});

type ClientAll = z.infer<typeof ClientAllSchema>;

const ClientIDSchema = z.object({
  client_id: z.coerce.number().int(),
});

type ClientID = z.infer<typeof ClientIDSchema>;

export { ClientSchema, Client,ClientAll,ClientAllSchema,ClientIDSchema,ClientID };