import Fastify from "fastify";
const fastify = Fastify({ logger: false });
import dotenv from 'dotenv'
dotenv.config()
// cookie
import cookie from '@fastify/cookie'
fastify.register(cookie);
// Database
import pool from "./lib/db.js";

// Cors Origin
import cors from '@fastify/cors';

// mutipart
import fastifyMultipart from '@fastify/multipart';
fastify.register(fastifyMultipart,{
  attachFieldsToBody: false,
  limits:{
    fileSize: 20 * 1024 * 1024,
    files: 10,
  }
});

fastify.register(cors, {
  origin: 'http://localhost:5173', 
  credentials: true,
  methods: ["GET" , "POST" , "PUT" , "DELETE"]
});

// Routers
import AuthRoutes from "./Routes/AuthRoutes.js";
import DashboardRoutes from "./Routes/DashboardRoutes.js";
import AdminRoutes from "./Routes/AdminRoutes.js";
fastify.register(AuthRoutes, { prefix: "/api" });
fastify.register(DashboardRoutes, { prefix: "/api" });
fastify.register(AdminRoutes, { prefix: "/api" });




async function start() {
  try {
    await fastify.listen({ port: 8080 , host: "0.0.0.0"});
    console.log("Server is running on http://localhost:8080");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start();