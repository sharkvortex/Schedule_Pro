import { Authentication,Register , Login , Logout } from "../Controllers/Authentication.js";
const AuthRoutes = (fastify , option) => {
    fastify.get('/authentication', Authentication);
    fastify.post('/register', Register);
    fastify.post('/login', Login);
    fastify.post('/logout', Logout);
}

export default AuthRoutes;