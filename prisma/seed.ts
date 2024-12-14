import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const provinces = [
    { name: "Phnom Penh" },
    { name: "Siem Reap" },
    { name: "Battambang" },
    { name: "Kampong Cham" },
    { name: "Kampong Thom" },
    { name: "Kampot" },
    { name: "Kandal" },
    { name: "Koh Kong" },
    { name: "Kratie" },
    { name: "Mondulkiri" },
    { name: "Preah Vihear" },
    { name: "Prey Veng" },
    { name: "Pursat" },
    { name: "Ratanakiri" },
    { name: "Sihanoukville" },
    { name: "Stung Treng" },
    { name: "Svay Rieng" },
    { name: "Takeo" },
    { name: "Tboung Khmum" },
    { name: "Banteay Meanchey" },
    { name: "Oddar Meanchey" },
    { name: "Pailin" },
    { name: "Kep" },
    { name: "Pursat" },
  ];

  // Insert provinces into the database
  for (const province of provinces) {
    await prisma.province.create({ data: province });
  }

  console.log("Provinces seeded successfully!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
