import Fastify from "fastify";
import rateLimit from '@fastify/rate-limit';
import dotenv from 'dotenv';
dotenv.config();

import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';

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
  }
});
await fastify.register(cors, {
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
});

await fastify.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
  hook: 'onRequest', 
  addHeaders: {
    'x-ratelimit-limit': true,
    'x-ratelimit-remaining': true,
    'x-ratelimit-reset': true
  }
});


await fastify.register(AuthRoutes, { prefix: "/api" });
await fastify.register(DashboardRoutes, { prefix: "/api" });
await fastify.register(AdminRoutes, { prefix: "/api" });
await fastify.register(Routes, { prefix: "/api" });



await fastify.ready();

export default fastify;
