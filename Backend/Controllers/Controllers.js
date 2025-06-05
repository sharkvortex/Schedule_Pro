import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
// GET ALL SUBJECTS
export const getSubjects = async (request, reply) => {
  try {
    const subjects = await prisma.subject.findMany();

    const dayOrder = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    const periodOrder = ["MORNING", "AFTERNOON", "EVENING"];

    const sortedSubjects = subjects.sort((a, b) => {
      const dayDiff =
        dayOrder.indexOf(a.study_day) - dayOrder.indexOf(b.study_day);
      if (dayDiff !== 0) return dayDiff;

      const periodDiff =
        periodOrder.indexOf(a.period) - periodOrder.indexOf(b.period);
      if (periodDiff !== 0) return periodDiff;

      return a.time_start.localeCompare(b.time_start);
    });

    return reply.status(200).send({
      message:
        sortedSubjects.length === 0
          ? "No subjects found."
          : "Subjects fetched successfully.",
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

// GET SUBJECT BY ID
export const getSubjectId = async (request, reply) => {
  const { subjectId } = request.params;
  try {
    const subject = await prisma.subject.findUnique({
      where: {
        subject_id: subjectId,
      },
    });

    if (!subject) {
      return reply.status(404).send({
        message: "Subject not found.",
      });
    }

    return reply.status(200).send({
      message: "Subject fetched successfully.",
      subject: subject,
    });
  } catch (error) {
    console.error("Error fetching subject:", error);
    return reply.status(500).send({
      message: "Failed to fetch subject.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getWorkSubjectId = async (request, reply) => {
  const { subjectId } = request.params;
  const { orderBy } = request.query;
  try {
    const works = await prisma.work.findMany({
      where: {
        subject_id: subjectId,
      },
      orderBy: {
        assignedDate: orderBy.toLowerCase() === "asc" ? "asc" : "desc",
      },
    });

    return reply.status(200).send({
      message: "Works fetched successfully.",
      data: works || [],
    });
  } catch (error) {
    console.error("Error fetching subject by ID:", error);
    return reply.status(500).send({
      message: "Failed to fetch works by subject ID.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// GET WORK_ID
export const getWorkId = async (request, reply) => {
  const { subjectId, id } = request.params;

  try {
    const work = await prisma.work.findFirst({
      where: {
        id: parseInt(id),
        subject_id: subjectId,
      },
      include: {
        images: true,
      },
    });

    if (!work) {
      return reply.status(404).send({
        message: "Work not found.",
      });
    }

    return reply.status(200).send({
      message: "Work fetched successfully.",
      data: work,
    });
  } catch (error) {
    console.error("Error fetching work by ID:", error);
    return reply.status(500).send({
      message: "Failed to fetch work by ID.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// USER PROFILE
export const getUserProfile = async (request, reply) => {
  try {
    const authHeader = request.headers.authorization;
    const tokenFromHeader = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;
    const token = request.cookies.schedule_pro || tokenFromHeader;

    if (!token) {
      return reply.status(401).send({ message: "Token not found." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ตรวจสอบ JWT และถอดรหัส

    const userId = decoded.id;

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      select: {
        id: true,
        studentId: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return reply.status(404).send({ message: "User not found." });
    }

    return reply.status(200).send(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);

    return reply.status(500).send({
      message: "Failed to fetch user profile.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// EDIT PROFILE
export const editUserProfile = async (request, reply) => {
  try {
    const authHeader = request.headers.authorization;
    const tokenFromHeader = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;
    const token = request.cookies.schedule_pro || tokenFromHeader;

    if (!token) {
      return reply.status(401).send({ message: "Token not found." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { user } = request.body;
    const { id, firstName, lastName } = user;

    if (parseInt(id) !== parseInt(userId)) {
      return reply.status(403).send({ message: "ยืนยันตัวตนผิดพลาด." });
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: {
        firstName,
        lastName,
      },
    });

    return reply.status(200).send({
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return reply.status(500).send({
      message: "Failed to update user profile.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
// Send Mail Reset Password
export const sendMailResetPassword = async (request, reply) => {
  try {
    const email = request.body.email?.replace(/\s+/g, "").toLowerCase();

    if (!email) {
      return reply.code(400).send({
        success: false,
        message: "กรุณากรอกอีเมลที่ต้องการรีเซ็ตรหัสผ่าน",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, firstName: true, lastName: true , authGoogle: true },
    });

    if (!user) {
      return reply.code(200).send({
        success: true,
        message:
          "หากอีเมลนี้อยู่ในระบบของ Sked Pro คุณจะได้รับลิงก์สำหรับรีเซ็ตรหัสผ่านทางอีเมลภายในไม่กี่นาที",
      });
    }
   
    if (user.authGoogle) {
      return reply.code(400).send({
        success: false,
        message: "อีเมลนี้เข้าสู่ระบบด้วย Google",
      });
    }

    const token = jwt.sign(
      {
        userId: user?.id,
        email: email,
        type: "password_reset",
      },
      process.env.RESET_PASSWORD_SECRET,
      { expiresIn: "10m" }
    );

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const emailTemplate = `
      <!DOCTYPE html>
      <html lang="th">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>รีเซ็ตรหัสผ่าน - Sked Pro</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
              Sked Pro
            </h1>
           
          </div>

          <!-- Content -->
          <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 7C13.1 7 14 7.9 14 9S13.1 11 12 11 10 10.1 10 9 10.9 7 12 7ZM12 17C10.67 17 9.67 16.33 9 15.67V14.33C9.67 15 10.67 15.67 12 15.67S14.33 15 15 14.33V15.67C14.33 16.33 13.33 17 12 17Z" fill="white"/>
                </svg>
              </div>
              <h2 style="color: #1a202c; margin: 0; font-size: 24px; font-weight: 600;">
                คำขอรีเซ็ตรหัสผ่าน
              </h2>
            </div>

            <div style="background-color: #f7fafc; border-left: 4px solid #667eea; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
              <p style="margin: 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                เราได้รับคำขอรีเซ็ตรหัสผ่านสำหรับบัญชี Sked Pro ของคุณ
                ${user ? `สวัสดีคุณ ${user.firstName} ${user.lastName}` : ""}
              </p>
            </div>

            <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 20px 0;">
              หากคุณเป็นผู้ร้องขอการรีเซ็ตรหัสผ่าน กรุณาคลิกที่ปุ่มด้านล่างเพื่อดำเนินการ:
            </p>

            <!-- CTA Button -->
            <div style="text-align: center; margin: 35px 0;">
              <a href="${resetLink}" 
                 style="display: inline-block; 
                        padding: 16px 32px; 
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: #ffffff; 
                        text-decoration: none; 
                        border-radius: 12px; 
                        font-size: 16px; 
                        font-weight: 600; 
                        letter-spacing: 0.5px;
                        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                        transition: all 0.3s ease;">
                🔐 รีเซ็ตรหัสผ่านของฉัน
              </a>
            </div>

            <!-- Security Info -->
            <div style="background-color: #fff5f5; border: 1px solid #fed7d7; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <div style="display: flex; align-items: flex-start;">
                <div style="margin-right: 12px; margin-top: 2px;">
                  ⚠️
                </div>
                <div>
                  <h4 style="color: #c53030; margin: 0 0 8px 0; font-size: 16px;">ข้อมูลสำคัญด้านความปลอดภัย</h4>
                  <ul style="color: #742a2a; font-size: 14px; margin: 0; padding-left: 16px; line-height: 1.5;">
                    <li>ลิงก์นี้จะหมดอายุภายใน <strong>10 นาที</strong></li>
                    <li>ใช้งานได้เพียงครั้งเดียวเท่านั้น</li>
                    <li>หากไม่ได้เป็นผู้ร้องขอ กรุณาเพิกเฉยต่ออีเมลนี้</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Alternative Link -->
            <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <p style="color: #4a5568; font-size: 14px; margin: 0 0 10px 0;">
                หากปุ่มด้านบนไม่ทำงาน คุณสามารถคัดลอกและวางลิงก์ด้านล่างในเบราว์เซอร์:
              </p>
              <div style="background-color: #edf2f7; padding: 12px; border-radius: 6px; word-break: break-all; font-family: 'Courier New', monospace; font-size: 12px; color: #2d3748;">
                ${resetLink}
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <div style="margin-bottom: 20px;">
              <h3 style="color: #4a5568; margin: 0 0 10px 0; font-size: 18px;">ต้องการความช่วยเหลือ?</h3>
              <p style="color: #718096; margin: 0; font-size: 14px;">
                ติดต่อทีมสนับสนุนของเราได้ตลอด 24/7
              </p>
            </div>
            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px;">
              <p style="color: #a0aec0; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} Sked Pro. สงวนลิขสิทธิ์ทั้งหมด
              </p>
              <p style="color: #a0aec0; font-size: 12px; margin: 5px 0 0 0;">
                อีเมลนี้ส่งไปยัง ${email}
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: {
        name: "Sked Pro Support Team",
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: "🔐 รีเซ็ตรหัสผ่าน - Sked Pro",
      html: emailTemplate,
      priority: "high",
    });

    return reply.code(200).send({
      success: true,
      message:
        "หากอีเมลนี้อยู่ในระบบของ Sked Pro คุณจะได้รับลิงก์สำหรับรีเซ็ตรหัสผ่านทางอีเมลภายในไม่กี่นาที",
    });
  } catch (error) {
    console.error("Password reset email error:", {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });

    return reply.code(500).send({
      success: false,
      message: "เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่อีกครั้งหรือติดต่อทีมสนับสนุน",
    });
  }
};

// Verify Reset Password Token
export const verifyResetPasswordToken = async (request, reply) => {
  const token = request.headers.authorization;

  if (!token) {
    return reply.status(400).send({
      success: false,
      message: "Token not provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);

    return reply.status(200).send({
      success: true,
      message: "Token is valid.",
      userId: decoded.userId,
      email: decoded.email,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return reply.status(401).send({
        success: false,
        message: "Token has expired. Please request a new password reset link.",
      });
    }

    return reply.status(400).send({
      success: false,
      message: "Invalid token.",
    });
  }
};

// Change-Password
export const resetChangePassword = async (request, reply) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return reply.code(401).send({ message: 'Token ไม่ถูกต้องหรือหมดอายุ' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);

    const userId = decoded.userId;
    if (!userId) {
      return reply.code(400).send({ message: 'ไม่พบข้อมูลผู้ใช้ใน token' });
    }

    const { password } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return reply.send({ message: 'เปลี่ยนรหัสผ่านสำเร็จ' });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return reply.code(401).send({
        message: 'Token หมดอายุ กรุณาขอรหัสผ่านใหม่',
        expiredAt: error.expiredAt,
      });
    }
    console.error('resetChangePassword error:', error);
    return reply.code(401).send({ message: 'Token ไม่ถูกต้องหรือหมดอายุ' });
  }
};