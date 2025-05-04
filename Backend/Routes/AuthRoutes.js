import { Authentication,Register } from "../Controllers/Authentication.js";
const AuthRoutes = (fastify , option) => {
    fastify.get('/authentication', Authentication);
    fastify.post('/register', Register);
}

export default AuthRoutes;