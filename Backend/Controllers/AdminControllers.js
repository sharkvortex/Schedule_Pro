import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET USERS
export const getUsers = async (request, reply) => {
  const { search = "", page = 1, limit = 10 } = request.query; // รับค่า page และ limit

  try {
    const skip = (page - 1) * limit;
    const take = parseInt(limit, 10);

    const whereCondition = search
      ? {
          OR: [
            { username: { contains: search.toLowerCase() } },
            { firstName: { contains: search.toLowerCase() } },
            { lastName: { contains: search.toLowerCase() } },
            { email: { contains: search.toLowerCase() } },
            { role: { contains: search.toLowerCase() } },
          ],
        }
      : undefined;

    const totalCount = await prisma.user.count({
      where: whereCondition,
    });

    const allUsers = await prisma.user.findMany({
      where: whereCondition,
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const rolePriority = {
      admin: 1,
      member: 2,
      user: 3,
    };

    allUsers.sort((a, b) => rolePriority[a.role] - rolePriority[b.role]);

    const users = allUsers.slice(skip, skip + take);

    return reply.status(200).send({
      users,
      totalCount: allUsers.length,
    });
  } catch (error) {
    console.error("Error in getUsers:", error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
};

//EDIT USERS

export const editUser = async (request, reply) => {
  const { id } = request.params;
  const { username, email, firstName, lastName, role } = request.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      return reply.code(404).send({ error: "User not found" });
    }

    if (username && username !== existingUser.username) {
      const existingUsername = await prisma.user.findFirst({
        where: {
          username,
          NOT: { id: Number(id) },
        },
      });

      if (existingUsername) {
        return reply.code(400).send({ error: "Username is already taken." });
      }
    }

    if (email && email !== existingUser.email) {
      const existingEmail = await prisma.user.findFirst({
        where: {
          email,
          NOT: { id: Number(id) },
        },
      });

      if (existingEmail) {
        return reply.code(400).send({ error: "Email is already taken." });
      }
    }

    const dataToUpdate = {
      updatedAt: new Date(),
    };

    if (username) dataToUpdate.username = username;
    if (email) dataToUpdate.email = email;
    if (firstName) dataToUpdate.firstName = firstName;
    if (lastName) dataToUpdate.lastName = lastName;
    if (role) dataToUpdate.role = role;

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: dataToUpdate,
    });

    return reply.send({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return reply.code(500).send({ error: "Something went wrong" });
  }
};

// DELETE USER BY ID
export const deleteUser = async (request, reply) => {
  const id = parseInt(request.params.id);
  console.log(id);
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return reply.code(404).send({ message: "User not found" });
    }

    await prisma.user.delete({
      where: { id },
    });

    return reply.code(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return reply.code(500).send({ message: "Something went wrong" });
  }
};




// GET ALL SUBJECTS
export const getSubjects = async (request, reply) => {
  try {
    const subjects = await prisma.subjects.findMany();

    if (!subjects || subjects.length === 0) {
      return reply.status(404).send({
        message: "No subjects found.",
        data: [],
      });
    }

    return reply.status(200).send({
      message: "Subjects fetched successfully.",
      data: subjects,
    });

  } catch (error) {
    console.error("Error fetching subjects:", error);
    return reply.status(500).send({
      message: "Failed to fetch subjects.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
