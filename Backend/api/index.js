import awsLambdaFastify from "@fastify/aws-lambda";
import fastify from "../app.js";

const proxy = awsLambdaFastify(fastify);
export const handler = proxy;