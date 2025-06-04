import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



export const CountData = async (request, reply) => {
  try {
    const [totalUsers, totalSubjects , totalWorks] = await Promise.all([
      prisma.user.count(),
      prisma.subject.count(),
      prisma.work.count(),
    ]);

    return reply.status(200).send({
      message: "Counts fetched successfully.",
      data: {
        totalUsers,
        totalSubjects,
        totalWorks,
      },
    });

  } catch (error) {
    console.error("Error fetching counts:", error);

    return reply.status(500).send({
      message: "An error occurred while fetching data counts.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

