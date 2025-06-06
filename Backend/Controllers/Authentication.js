import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const Authentication = async (request, reply) => {
  try {
    const authHeader = request.headers.authorization;
    const tokenFromHeader = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    const token = request.cookies.schedule_pro || tokenFromHeader;

    if (!token) {
      return reply
        .status(401)
        .send({ message: "No token provided", Login: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return reply
        .status(401)
        .send({ message: "User not found", Login: false });
    }

    const fieldsChanged =
      decoded.firstName !== user.firstName ||
      decoded.lastName !== user.lastName ||
      decoded.username !== user.username ||
      decoded.email !== user.email ||
      decoded.role !== user.role;

    if (fieldsChanged) {
      const newToken = jwt.sign(
        {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

     

      reply.setCookie("schedule_pro", newToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none" ,
        path: "/",
        maxAge: 24 * 60 * 60,
      });

      request.user = jwt.verify(newToken, process.env.JWT_SECRET);

      return reply.status(200).send({
        user: request.user,
        Login: true,
        message: "Token updated due to user data change",
      });
    }

    request.user = decoded;
    return reply.status(200).send({ user: decoded, Login: true });
  } catch (error) {
    return reply.status(401).send({
      message: "Invalid or expired token",
      error: error.message,
      Login: false,
    });
  }
};

// Register
export const Register = async (request, reply) => {
  const formData = request.body;

  const username = formData.username?.toLowerCase();
  const email = formData.email?.toLowerCase();
  const password = formData.password;
  const confirmPassword = formData.confirmPassword?.toLowerCase(); // เผื่อกรอกเป็นตัวใหญ่
  const studentId = formData.studentId;

  if (password !== confirmPassword) {
    return reply.status(400).send({ message: "Passwords do not match." });
  }

  try {
    const [existingStudentId, existingUsername, existingEmail] =
      await Promise.all([
        prisma.user.findUnique({ where: { studentId } }),
        prisma.user.findUnique({ where: { username } }),
        prisma.user.findUnique({ where: { email } }),
      ]);

    if (existingStudentId) {
      return reply.status(400).send({ message: "Student ID already exists." });
    }
    if (existingUsername) {
      return reply.status(400).send({ message: "Username already exists." });
    }
    if (existingEmail) {
      return reply.status(400).send({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        studentId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        username, 
        email,    
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    reply.setCookie("schedule_pro", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      path: "/",
      maxAge: 24 * 60 * 60,
    });

    return reply.status(201).send({
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return reply
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

// Login
export const Login = async (request, reply) => {
  let { username, password, checked } = request.body;

  if (!username || !password) {
    return reply.status(400).send({
      message: "Enter your username and password",
    });
  }

  // Convert input to lowercase
  username = username.toLowerCase();

  try {
    const [StudentId, Username, Email] = await Promise.all([
      prisma.user.findUnique({ where: { studentId: username } }),
      prisma.user.findUnique({ where: { username: username } }),
      prisma.user.findUnique({ where: { email: username } }),
    ]);

    const user = StudentId || Username || Email;
    if (!user) {
      return reply.status(404).send({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return reply.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: checked ? "7d" : "1d",
      }
    );

    reply.setCookie("schedule_pro", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 24 * 60 * 60,
    });

    return reply.status(200).send({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    return reply.status(500).send({ message: "Internal server error" });
  }
};


// Logout
export const Logout = async (request, reply) => {
  try {

      reply.clearCookie("schedule_pro", {
        httpOnly: true,
        secure: true,
        sameSite:  "none",
        path: "/",
        maxAge: 24 * 60 * 60,
      });

    reply.send({ message: "Logged out successfully" });
  } catch (error) {
    reply.code(500).send({ error: "Logout failed" });
  }
};
