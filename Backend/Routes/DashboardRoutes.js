import { verifyToken } from "../middleware.js";
import { CountData } from "../Controllers/Dashboard.js";
const DashboardRoutes = (fastify , option) => {
    fastify.get('/dashboard' ,{preHandler: verifyToken}, CountData);
}

export default DashboardRoutes;