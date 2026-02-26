import { prisma } from "../prisma/prismaClient.js";

function serialize(record) {
  return {
    id: record.id,
    name: record.name,
    breed: record.breed,
    type: record.type,
    color: record.color,
    ageWeeks: record.ageWeeks,
    weightKg: record.weightKg,
    status: record.status,
    notes: record.notes,
    isNewborn: record.isNewborn,
    createdAt: record.createdAt.toISOString(),
  };
}

export async function getChickensService() {
  const records = await prisma.chicken.findMany({
    orderBy: { createdAt: "desc" },
  });
  return records.map(serialize);
}

export async function addChickenService(data) {
  const record = await prisma.chicken.create({
    data: {
      name: data.name,
      breed: data.breed,
      type: data.type,
      color: data.color,
      ageWeeks: data.ageWeeks,
      weightKg: data.weightKg,
      status: data.status,
      notes: data.notes ?? "",
      isNewborn: data.isNewborn,
    },
  });
  return serialize(record);
}

export async function deleteChickenService(id) {
  await prisma.chicken.delete({ where: { id } });
}
