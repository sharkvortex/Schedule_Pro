// server.js
import fastify from './app.js';

const PORT = process.env.PORT || 8080;

fastify.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server is running on ${address}`);
});
