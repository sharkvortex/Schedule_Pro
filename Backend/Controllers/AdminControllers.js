import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET USERS
export const getUsers = async (request, reply) => {
  const { search = "", page = 1, limit = 10 } = request.query;

  try {
    const skip = (page - 1) * limit;
    const take = parseInt(limit, 10);
    const searchLower = search.toLowerCase();

    const isValidRole = ["admin", "member", "user"].includes(searchLower);

    const whereCondition = search
      ? {
          OR: [
            { username: { contains: search } },
            { firstName: { contains: search } },
            { lastName: { contains: search } },
            { email: { contains: search } },
            ...(isValidRole ? [{ role: searchLower }] : []),
          ],
        }
      : {};

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

    const totalCount = allUsers.length;

    const rolePriority = {
      admin: 1,
      member: 2,
      user: 3,
    };

    const sortedUsers = allUsers.sort(
      (a, b) => rolePriority[a.role] - rolePriority[b.role]
    );

    const users = sortedUsers.slice(skip, skip + take);

    return reply.status(200).send({
      users,
      totalCount,
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

    const dayOrder = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    const periodOrder = ["MORNING", "AFTERNOON", "EVENING"];

   
    const sortedSubjects = subjects.sort((a, b) => {
      const dayDiff = dayOrder.indexOf(a.study_day) - dayOrder.indexOf(b.study_day);
      if (dayDiff !== 0) return dayDiff;

      const periodDiff = periodOrder.indexOf(a.period) - periodOrder.indexOf(b.period);
      if (periodDiff !== 0) return periodDiff;

      return a.time_start.localeCompare(b.time_start);
    });

    return reply.status(200).send({
      message: sortedSubjects.length === 0 ? "No subjects found." : "Subjects fetched successfully.",
      data: sortedSubjects,
    });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return reply.status(500).send({
      message: "Failed to fetch subjects.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};


// CREATE SUBJECT
export const createSubject = async (request, reply) => {
  try {
    const {
      subject_id,
      subject_name,
      teacher_name,
      study_day,
      period,
      time_start,
      time_end,
      room,
    } = request.body;

    if (
      !subject_id ||
      !subject_name ||
      !teacher_name ||
      !study_day ||
      !period ||
      !time_start ||
      !time_end ||
      !room
    ) {
      return reply.status(400).send({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }

    const validDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    const validPeriods = ["MORNING", "AFTERNOON", "EVENING"];

    if (!validDays.includes(study_day)) {
      return reply.status(400).send({ message: "ค่าวันเรียนไม่ถูกต้อง" });
    }

    if (!validPeriods.includes(period)) {
      return reply.status(400).send({ message: "ค่าช่วงเวลาไม่ถูกต้อง" });
    }

    const existingSubject = await prisma.subjects.findFirst({
      where: {
        study_day,
        period,
      },
    });

    if (existingSubject) {
      return reply.status(409).send({
        message: "มีวิชาอื่นเรียนในวันและช่วงเวลานี้แล้ว",
      });
    }

    const newSubject = await prisma.subjects.create({
      data: {
        subject_id,
        subject_name,
        teacher_name,
        study_day,
        period,
        time_start,
        time_end,
        room,
      },
    });

    return reply.status(201).send({
      message: "สร้างรายวิชาเรียบร้อยแล้ว",
      data: newSubject,
    });
  } catch (error) {
    console.error("Error creating subject:", error);

    if (error.code === "P2002") {
      return reply.status(409).send({ message: "รหัสวิชานี้มีอยู่ในระบบแล้ว" });
    }

    return reply.status(500).send({ message: "เกิดข้อผิดพลาดในระบบ" });
  }
};

// EDIT SUBJECT
export const editSubject = async (request, reply) => {
  const {id,subject_id,subject_name,
        teacher_name,
        study_day,
        time_start,
        time_end,
        period,
        room} = request.body;
  try {
    const existing = await prisma.subjects.findUnique({
      where: { id },
    });

    if (!existing) {
      return reply.code(404).send({ message: "ไม่พบ id ในระบบ" });
    }

    const duplicateID = await prisma.subjects.findFirst({
      where: {
        subject_id,
        NOT: { id: existing.id },
      },
    });

    if (duplicateID) {
      return reply.code(400).send({ message: "รหัสวิชานี้มีในระบบแล้ว" });
    }

    const overlappingSchedule = await prisma.subjects.findFirst({
      where: {
        study_day,
        period,
        NOT: { id: existing.id },
      },
    });

    if (overlappingSchedule) {
      return reply.code(400).send({
        message: "ตารางซ้ำ",
      });
    }

    const updatedSubject = await prisma.subjects.update({
      where: { id },
      data: {
        subject_id,
        subject_name,
        teacher_name,
        study_day,
        time_start,
        time_end,
        period,
        room,
        updateAt: new Date(),
      },
    });

    return reply.code(200).send({
      message: "แก้ไขรายวิชาสำเร็จ",
      data: updatedSubject,
    });
  } catch (error) {
    console.error("Edit subject error:", error);
    return reply.code(500).send({
      message: "ไม่สามารถแก้ไขรายวิชาได้",
      error: error.message,
    });
  }
};

// DELETE SUBJECT
export const deleteSubject = async (request, reply) => {
  const { id } = request.params;
  try {
    
    const existingSubject = await prisma.subjects.findUnique({
      where: { id: Number(id) },
    });

    if (!existingSubject) {
      return reply.code(404).send({
        message: 'ไม่พบรายวิชาที่ต้องการลบ',
      });
    }

    await prisma.subjects.delete({
      where: { id: Number(id) },
    });

    return reply.code(200).send({
      message: 'ลบรายวิชาสำเร็จ',
    });
  } catch (error) {
    console.error('Delete subject error:', error);
    return reply.code(500).send({
      message: 'ไม่สามารถลบรายวิชาได้',
      error: error.message,
    });
  }
};
