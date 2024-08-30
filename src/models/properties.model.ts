
import { Prisma } from "@prisma/client";
import { z } from "zod";

const PropertieSchema = z.object({
  property_type: z.string(),
  address: z.string(),
  size: z
    .number()
    .refine((value) => !isNaN(parseFloat(String(value))))
    .transform((value) => parseFloat(String(value))),
  num_rooms: z.coerce.number(),
  price: z
    .number()
    .nonnegative()
    .transform((value) => new Prisma.Decimal(value)),
  status: z.string(),
});

type Propertie = z.infer<typeof PropertieSchema>;

const PropertieAllSchema = z.object({
  property_type: z.string().optional(),
  address: z.string().optional(),
  size: z.number().optional(),
  num_rooms: z.coerce.number().nonnegative().optional(),
  price: z
    .number()
    .nonnegative()
    .transform((value) => new Prisma.Decimal(value)).optional(),
  status: z.string().optional(),
});

type PropertieAll = z.infer<typeof PropertieAllSchema>;

const PropertieIDSchema = z.object({
  property_id: z.coerce.number().int(),
});

type PropertieID = z.infer<typeof PropertieIDSchema>;

export {
  PropertieSchema,
  Propertie,
  PropertieAllSchema,
  PropertieAll,
  PropertieIDSchema,
  PropertieID,
};
