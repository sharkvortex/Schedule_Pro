import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const prisma = new PrismaClient();

// Authentication
export const Authentication = async (request, reply) => {
  try {
    const authHeader = request.headers.authorization;
    const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    const token = request.cookies.schedule_pro || tokenFromHeader;

    if (!token) {
      return reply.status(401).send({ message: 'No token provided', Login: false });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    request.user = decoded;

    return reply.status(200).send({ user: decoded , Login: true });
  } catch (error) {
   
    return reply.status(401).send({ 
      message: 'Invalid or expired token',
      error: error.message, 
      Login: false 
    });
  }
};

// Register
export const Register = async (request, reply) => {
  const formData = request.body;

  if (formData.password !== formData.confirmPassword) {
    return reply.status(400).send({ message: "Passwords do not match." });
  }

  try {
    const [existingStudentId, existingUsername, existingEmail] = await Promise.all([
      prisma.user.findUnique({ where: { studentId: formData.studentId } }),
      prisma.user.findUnique({ where: { username: formData.username } }),
      prisma.user.findUnique({ where: { email: formData.email } }),
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

    const hashedPassword = await bcrypt.hash(formData.password , 12)
    const user = await prisma.user.create({
      data: {
        studentId: formData.studentId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,         
      },
      process.env.JWT_SECRET,     
      { expiresIn: '1d' }        
    );
    
    reply.setCookie('schedule_pro', token, {
      httpOnly: true,            
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',         
      path: '/',                  
      maxAge: 24 * 60 * 60,   
    });



    return reply.status(201).send({
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      }
    });

  } catch (error) {
    console.error('Error during registration:', error);
    return reply.status(500).send({ message: 'Internal Server Error', error: error.message });
  }
};
