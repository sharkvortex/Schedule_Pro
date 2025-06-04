import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import ImageKit from "imagekit";
const imagekit = new ImageKit({
  publicKey:  process.env.IMAGE_KIT_PUBLIC_KEY || 'public_pgZUE9kKgwJ6SoMX0HrBj45djnU=' ,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
});

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
            { studentId: { contains: search } },
            ...(isValidRole ? [{ role: searchLower }] : []),
          ],
        }
      : {};

    const allUsers = await prisma.user.findMany({
      where: whereCondition,
      select: {
        id: true,
        studentId: true,
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
  const userId = Number(request.params.id);
  if (isNaN(userId)) {
    return reply.code(400).send({ message: "Invalid user ID" });
  }

  const { username, studentId, email, firstName, lastName, role } =
    request.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return reply.code(404).send({ message: "User not found" });
    }

    if (username && username !== existingUser.username) {
      const existingUsername = await prisma.user.findFirst({
        where: {
          username,
          NOT: { id: userId },
        },
      });
      if (existingUsername) {
        return reply.code(400).send({ message: "Username is already taken." });
      }
    }

    if (email && email !== existingUser.email) {
      const existingEmail = await prisma.user.findFirst({
        where: {
          email,
          NOT: { id: userId },
        },
      });
      if (existingEmail) {
        return reply.code(400).send({ message: "Email is already taken." });
      }
    }

    if (studentId && studentId !== existingUser.studentId) {
      const existingStudentId = await prisma.user.findFirst({
        where: {
          studentId,
          NOT: { id: userId },
        },
      });
      if (existingStudentId) {
        return reply
          .code(400)
          .send({ message: "Student ID is already taken." });
      }
    }

    const fieldsToUpdate = {
      username,
      studentId,
      email,
      firstName,
      lastName,
      role,
    };
    const dataToUpdate = {
      ...Object.fromEntries(
        Object.entries(fieldsToUpdate).filter(([_, v]) => v !== undefined)
      ),
      updatedAt: new Date(),
    };

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate,
    });

    return reply.status(200).send({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return reply.code(500).send({ message: "Something went wrong" });
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
  const {
    id,
    subject_id,
    subject_name,
    teacher_name,
    study_day,
    time_start,
    time_end,
    period,
    room,
  } = request.body;
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
        message: "ไม่พบรายวิชาที่ต้องการลบ",
      });
    }

    await prisma.subjects.delete({
      where: { id: Number(id) },
    });

    return reply.code(200).send({
      message: "ลบรายวิชาสำเร็จ",
    });
  } catch (error) {
    console.error("Delete subject error:", error);
    return reply.code(500).send({
      message: "ไม่สามารถลบรายวิชาได้",
      error: error.message,
    });
  }
};

// CREATEWORK
export const createWork = async (request, reply) => {
  const parts = request.parts();
  const workData = {};
  const uploadPromises = [];

  try {
    for await (const part of parts) {
      if (part.file && part.fieldname === "image[]") {
        const chunks = [];
        for await (const chunk of part.file) {
          chunks.push(chunk);
        }
        const fileBuffer = Buffer.concat(chunks);

        const uploadPromise = new Promise((resolve, reject) => {
          const rawName = part.filename || "file.jpg";
          const ext = rawName.split(".").pop();
          const newFileName = `schedulr_pro_${Date.now()}.${ext}`;
          imagekit.upload(
            {
              file: fileBuffer,
              fileName: newFileName,
              useUniqueFileName: false,
            },
            (err, res) => {
              if (err) reject(err);
              else
                resolve({ url: res.url, fileId: res.fileId });
            }
          );
        });

        uploadPromises.push(uploadPromise);
      } else {
        workData[part.fieldname] = part.value;
      }
    }

    const requiredFields = ["subject_id", "title", "assignedDate", "dueDate"];
    for (const field of requiredFields) {
      if (!workData[field]) {
        return reply
          .status(400)
          .send({ message: `Missing required field: ${field}` });
      }
    }

    const createdWork = await prisma.works.create({
      data: {
        subject_id: workData.subject_id,
        title: workData.title,
        description: workData.description || null,
        assignedDate: new Date(workData.assignedDate),
        dueDate: new Date(workData.dueDate),
        link: workData.link || null,
        linkCode: workData.linkCode || null,
      },
    });

    if (uploadPromises.length > 0) {
      const imagesData = await Promise.all(uploadPromises);

      await prisma.images.createMany({
        data: imagesData.map(({ url, fileId }) => ({
          url,
          fileId,
          workId: createdWork.id,
        })),
      });
    }

    return reply.status(200).send({
      message: "✅ Work created successfully",
      workId: createdWork.id,
      imageCount: uploadPromises.length,
    });
  } catch (err) {
    console.error("❌ Failed to create work:", err);
    return reply.status(500).send({
      message: "❌ Internal server error during work creation",
      error: err.message,
    });
  }
};

// GET WORK
export const getWorks = async (request, reply) => {
  const { subject_id } = request.query;

  try {
    const works = await prisma.works.findMany({
      where: subject_id
        ? { subject_id } 
        : undefined,     
      include: {
        images: true,
        subject: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    reply.send(works);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูล works:", error);
    reply
      .code(500)
      .send({ message: "ไม่สามารถดึงข้อมูลได้", error: error.message });
  }
};


// EDIT WORK
export const editWork = async (request, reply) => {
  const parts = request.parts();

  const fields = {};
  const files = [];

  for await (const part of parts) {
    if (part.file) {
      files.push({
        filename: part.filename,
        mimetype: part.mimetype,
        buffer: await part.toBuffer(),
      });
    } else {
      fields[part.fieldname] = part.value;
    }
  }

  try {
    const workId = Number(fields.id);
    if (isNaN(workId)) {
      return reply.code(400).send({ error: "Invalid work ID" });
    }

    const existingWork = await prisma.works.findUnique({
      where: { id: workId },
    });

    if (!existingWork) {
      return reply.code(404).send({ error: "Work not found" });
    }

    const updateData = {};
    if (fields.title && fields.title !== existingWork.title) {
      updateData.title = fields.title;
    }
    if (fields.description && fields.description !== existingWork.description) {
      updateData.description = fields.description;
    }
    if (fields.assignedDate && new Date(fields.assignedDate).toISOString() !== existingWork.assignedDate.toISOString()) {
      updateData.assignedDate = new Date(fields.assignedDate);
    }
    if (fields.dueDate && new Date(fields.dueDate).toISOString() !== existingWork.dueDate.toISOString()) {
      updateData.dueDate = new Date(fields.dueDate);
    }
    if (fields.link && fields.link !== existingWork.link) {
      updateData.link = fields.link;
    }
    if (fields.linkCode && fields.linkCode !== existingWork.linkCode) {
      updateData.linkCode = fields.linkCode;
    }

    if (Object.keys(updateData).length > 0) {
      await prisma.works.update({
        where: { id: workId },
        data: updateData,
      });
    }

   
    if (files.length > 0) {
      const uploadPromises = files.map(file =>
        imagekit.upload({
          file: file.buffer,
          fileName: file.filename,
        })
      );

      const uploadResults = await Promise.all(uploadPromises);

      const imageData = uploadResults.map(result => ({
        workId: workId,
        url: result.url,
        fileId: result.fileId,
      }));

      await prisma.images.createMany({
        data: imageData,
      });
    }

    return reply.status(200).send({ message: "Work updated successfully" });

  } catch (error) {
    console.error("Error in editWork:", error);
    return reply.code(500).send({ error: "Something went wrong" });
  }
};

// DELETE WORK
export const deleteWork = async (request, reply) => {
  const { id } = request.params;

  try {
    const images = await prisma.images.findMany({
      where: { workId: Number(id) },
      select: { fileId: true },
    });

    if (images.length > 0) {
      await Promise.all(
        images.map((img) => imagekit.deleteFile(img.fileId))
      );
    }

    await prisma.works.delete({
      where: { id: Number(id) },
    });

    return reply.send({
      message:
        images.length > 0
          ? "ลบงานและรูปภาพสำเร็จ"
          : "ลบงานสำเร็จ",
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    return reply.status(500).send({ message: "เกิดข้อผิดพลาดในการลบงาน" });
  }
};

// DELETE IMAGE
export const deleteImage = async (request, reply) => {
  const { fileId } = request.params;

  if (!fileId || typeof fileId !== "string") {
    console.warn("⚠️ fileId ไม่ถูกต้อง:", fileId);
    return reply
      .status(400)
      .send({ success: false, message: "fileId ไม่ถูกต้องหรือไม่มีค่า" });
  }

  try {
    const [response] = await Promise.all([
      imagekit.deleteFile(fileId),
      prisma.images.deleteMany({ where: { fileId } }),
    ]);

    return reply
      .status(200)
      .send({ success: true, message: "ลบรูปภาพสำเร็จ", data: response });
  } catch (error) {
    console.error("❌ ลบรูปภาพไม่สำเร็จ:", error?.message || error);

    return reply
      .status(500)
      .send({
        success: false,
        message: "เกิดข้อผิดพลาดระหว่างลบรูปภาพ",
        error: error?.message || error,
      });
  }
};