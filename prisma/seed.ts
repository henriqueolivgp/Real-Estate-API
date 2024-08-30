import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {

await prisma.role.createMany({
    data: [
      { role_type: "admin", },
      { role_type: "agent" }, // Duplicate unique key!
      { role_type: "worker" },
      { role_type: "client" },
    ],
    skipDuplicates: true, // Skip 'Bobo'
  })

}

main()
  .then(() => {
    console.log("Roles added completed successfully.");
  })
  .catch((e) => {
    console.error("Error during adding roles into database:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
