import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import axios from "axios";
const prisma = new PrismaClient();

export const googleOAuthLogin = async (request, reply) => {
  const { access_token } = request.body;

  if (!access_token) {
    return reply.status(400).send({ message: "No access token provided" });
  }

  try {
    const googleUser = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const { sub, email, given_name, family_name } = googleUser.data;

    if (!sub || !email) {
      return reply
        .status(400)
        .send({ message: "Missing required fields from Google" });
    }

    let studentIdFromEmail = null;
    if (email.endsWith("@rmu.ac.th")) {
      studentIdFromEmail = email.split("@")[0];
    }

    const studentId = studentIdFromEmail || sub;

    let user = null;

    user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user && studentIdFromEmail) {
      user = await prisma.user.findUnique({
        where: { studentId: studentIdFromEmail },
      });
    }

    if (!user) {
      user = await prisma.user.create({
        data: {
          studentId,
          firstName: given_name,
          lastName: family_name || "",
          username: studentId,
          email,
          password: await bcrypt.hash(sub + email, 10),
          authGoogle: true,
        },
      });
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
      { expiresIn: "1d" }
    );

   

    reply.setCookie("schedule_pro", token, {
      httpOnly: true,
      secure: true, 
      sameSite: "none", 
      path: "/",
      maxAge: 24 * 60 * 60,
    });

   
    
    return reply.send({
      message: "Authenticated via Google",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("OAuth Login Error:", err);
    return reply
      .status(500)
      .send({ message: "Internal Server Error", error: err.message });
  }
};
