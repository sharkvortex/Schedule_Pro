import { verifyAdmin } from "../middleware.js";
import { getUsers , editUser , deleteUser , getSubjects} from "../Controllers/AdminControllers.js";
const AdminRoutes = (fastify , option) => {
   fastify.get('/users' ,{preHandler: verifyAdmin} , getUsers);
   fastify.put('/edit/user/:id' ,{preHandler: verifyAdmin} , editUser);
   fastify.delete('/delete/user/:id' ,{preHandler: verifyAdmin} , deleteUser);
   fastify.get('/subjects' ,{preHandler: verifyAdmin} , getSubjects);
}

export default AdminRoutes;