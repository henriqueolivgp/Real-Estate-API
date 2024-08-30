import { z } from "zod";
import { Prisma } from "@prisma/client";

const TransactionSchema = z.object({
  property_id: z.coerce.number(),
  client_id: z.coerce.string().uuid(),
  agent_id: z.coerce.number(),
  transaction_type: z.string(),
  transaction_date: z.coerce.date(),
  price: z
  .number()
  .nonnegative()
  .transform((value) => new Prisma.Decimal(value)),
});

type Transaction = z.infer<typeof TransactionSchema>;

const TransactionAllSchema = z.object({
  transaction_id: z.coerce.number().min(0),
  transaction_type: z.string(),
  transaction_date: z.date(),
  price: z
  .number()
  .nonnegative()
  .transform((value) => new Prisma.Decimal(value)),
});

type TransactionAll = z.infer<typeof TransactionAllSchema>;

const TransactionIDSchema = z.object({
  transaction_id: z.coerce.number(),
});

type TransactionID = z.infer<typeof TransactionIDSchema>;

export {
  TransactionSchema,
  Transaction,
  TransactionAllSchema,
  TransactionAll,
  TransactionIDSchema,
  TransactionID,
};
