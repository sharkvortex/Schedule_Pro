import Fastify from "fastify";
const fastify = Fastify({ logger: false });

// cookie
import cookie from '@fastify/cookie'
fastify.register(cookie);
// Database
import pool from "./lib/db.js";

// Cors Origin
import cors from '@fastify/cors';

fastify.register(cors, {
  origin: 'http://localhost:5173', 
  credentials: true, 
});

// Routers
import AuthRoutes from "./Routes/AuthRoutes.js";
fastify.register(AuthRoutes, { prefix: "/api" });




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