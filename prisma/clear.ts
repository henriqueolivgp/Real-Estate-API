import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Adicione aqui todas as tabelas do seu banco de dados
  await prisma.user.deleteMany({});
  await prisma.client.deleteMany({});
  await prisma.company.deleteMany({});
  await prisma.property.deleteMany({});
  await prisma.transaction.deleteMany({});
  await prisma.role.deleteMany({});
  // Continue para cada tabela no seu banco de dados...
}

main()
  .then(() => {
    console.log("Database cleaned completed successfully.");
  })
  .catch((e) => {
    console.error("Error during seeding:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
