import { verifyAdmin } from "../middleware.js";
import { getUsers , editUser , deleteUser , getSubjects , createSubject , editSubject , deleteSubject} from "../Controllers/AdminControllers.js";
const AdminRoutes = (fastify , option) => {
   fastify.get('/users' ,{preHandler: verifyAdmin} , getUsers);
   fastify.put('/edit/user/:id' ,{preHandler: verifyAdmin} , editUser);
   fastify.delete('/delete/user/:id' ,{preHandler: verifyAdmin} , deleteUser);
   fastify.get('/subjects' ,{preHandler: verifyAdmin} , getSubjects);
   fastify.post('/create/subject' ,{preHandler: verifyAdmin} , createSubject);
   fastify.put('/edit/subject' ,{preHandler: verifyAdmin} , editSubject);
   fastify.delete('/delete/subject/:id' ,{preHandler: verifyAdmin} , deleteSubject);
}

export default AdminRoutes;