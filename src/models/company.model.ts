import { z } from "zod";

// model Company {
//   company_id Int       @id @unique @default(autoincrement())
//   name       String
//   agents     Agent[]
//   clients    Client[]
//   workers    Worker[]
// }

const CompanySchema = z.object({
  name: z.string().min(4),
  agent_id: z.coerce.number(),
  client_id: z.coerce.number(),
  worker_id: z.coerce.number(),
});

type Company = z.infer<typeof CompanySchema>;

// const CompanytAllSchema = z.object({
//   name: z.string().min(4),
//   agent_id: z.coerce.number(),
//   client_id: z.coerce.number(),
//   worker_id: z.coerce.number(),

// });

// type ClientAll = z.infer<typeof CompanytAllSchema>;

const CompanyIDSchema = z.object({
  company_id: z.coerce.number().int(),
});

type CompanyID = z.infer<typeof CompanyIDSchema>;

export { CompanySchema, Company, CompanyIDSchema, CompanyID };
