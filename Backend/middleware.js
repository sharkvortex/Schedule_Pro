import jwt from "jsonwebtoken";

export const verifyAdmin = async (request, reply) => {
  try {
    const authHeader = request.headers.authorization;
    const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    const token = request.cookies.schedule_pro || tokenFromHeader;

    if (!token) {
      return reply
        .status(401)
        .send({ message: "Unauthorized: Token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return reply
        .status(403)
        .send({ message: "Forbidden: Admin access only" });
    }

    request.user = decoded;
  } catch (error) {
    console.error("Error verifying admin token:", error);
    return reply
      .status(401)
      .send({ message: "Unauthorized: Invalid or expired token" });
  }
};

export const verifyToken = async (request, reply) => {
  try {
    const authHeader = request.headers.authorization;
    const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    const token = request.cookies.schedule_pro || tokenFromHeader;

    if (!token) {
      return reply
        .status(401)
        .send({ message: "Unauthorized: Token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin" && decoded.role !== "member") {
        return reply
          .status(403)
          .send({ message: "Forbidden: Admin or Member access only" });
      }

    request.user = decoded;
  } catch (error) {
    console.error("Error verifying admin token:", error);
    return reply
      .status(401)
      .send({ message: "Unauthorized: Invalid or expired token" });
  }
};
