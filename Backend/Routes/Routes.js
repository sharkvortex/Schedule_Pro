import { verifyToken } from "../middleware.js";
import { getSubjects , getWorkSubjectId ,getSubjectId , getWorkId ,getUserProfile , editUserProfile , sendMailResetPassword , verifyResetPasswordToken , resetChangePassword } from "../Controllers/Controllers.js";
import { googleOAuthLogin } from "../Controllers/GoogleController.js";
const Routes = (fastify, option) => {
  fastify.get("/subjects", getSubjects);
  fastify.get("/subject/:subjectId", {preHandler: verifyToken}, getSubjectId);
  fastify.get("/work/subject/:subjectId",{preHandler: verifyToken}, getWorkSubjectId);
  fastify.get("/work/:subjectId/:id",{preHandler: verifyToken}, getWorkId);
  

  // Reset Password
  fastify.post("/auth/reset-password", sendMailResetPassword);
  fastify.get("/auth/reset-verifyToken" , verifyResetPasswordToken)
  fastify.put("/auth/reset-password" , resetChangePassword)
  // Profile 
  fastify.get("/user/profile", getUserProfile);
  fastify.put("/user/profile", editUserProfile);
  // GOOGLE AUTH ROUTE
  fastify.post("/auth/google", googleOAuthLogin);

};

export default Routes;