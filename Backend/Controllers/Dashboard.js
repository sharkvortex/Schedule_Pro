import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const CountData = async (request, reply) => {
  try {
    const [totalUsers, totalSubjects] = await Promise.all([
      prisma.user.count(),
      prisma.subjects.count(),
    ]);

    return reply.status(200).send({
      message: "Counts fetched successfully.",
      data: {
        totalUsers,
        totalSubjects,
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

