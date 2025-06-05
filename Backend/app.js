import Fastify from "fastify";
import rateLimit from "@fastify/rate-limit";
import dotenv from "dotenv";
dotenv.config();

import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";

import pool from "./lib/db.js";

import AuthRoutes from "./Routes/AuthRoutes.js";
import DashboardRoutes from "./Routes/DashboardRoutes.js";
import AdminRoutes from "./Routes/AdminRoutes.js";
import Routes from "./Routes/Routes.js";

const fastify = Fastify({ logger: false });

await fastify.register(cookie);

await fastify.register(fastifyMultipart, {
  attachFieldsToBody: false,
  limits: {
    fileSize: 20 * 1024 * 1024,
    files: 10,
  },
});

await fastify.register(cors, {
  origin: ["https://schedule-pro-plum.vercel.app" , ["http://localhost:5173"]],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
});

await fastify.register(rateLimit, {
  max: 100,
  timeWindow: "1 minute",
  hook: "onRequest",
  addHeaders: {
    "x-ratelimit-limit": true,
    "x-ratelimit-remaining": true,
    "x-ratelimit-reset": true,
  },
});

fastify.get("/", async (request, reply) => {
  return { message: "Hello Fastify!" };
});

await fastify.register(AuthRoutes, { prefix: "/api" });
await fastify.register(DashboardRoutes, { prefix: "/api" });
await fastify.register(AdminRoutes, { prefix: "/api" });
await fastify.register(Routes, { prefix: "/api" });

await fastify.ready();


const PORT = process.env.PORT || 8080;

fastify.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server is running at ${address}`);
});
