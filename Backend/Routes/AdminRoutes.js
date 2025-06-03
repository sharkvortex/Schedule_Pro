import { verifyAdmin  } from "../middleware.js";
import { getUsers , editUser , deleteUser  , createSubject , editSubject , deleteSubject , createWork , getWorks , deleteImage , deleteWork , editWork} from "../Controllers/AdminControllers.js";
const AdminRoutes = (fastify , option) => {
   fastify.get('/users' ,{preHandler: verifyAdmin} , getUsers);
   fastify.put('/edit/user/:id' ,{preHandler: verifyAdmin} , editUser);
   fastify.delete('/delete/user/:id' ,{preHandler: verifyAdmin} , deleteUser);
   fastify.post('/create/subject' ,{preHandler: verifyAdmin} , createSubject);
   fastify.put('/edit/subject' ,{preHandler: verifyAdmin} , editSubject);
   fastify.delete('/delete/subject/:id' ,{preHandler: verifyAdmin} , deleteSubject);
   fastify.post('/create/work' ,{preHandler: verifyAdmin} , createWork);
   fastify.get('/works' ,{preHandler: verifyAdmin} , getWorks);
   fastify.delete('/delete/image/:fileId' ,{preHandler: verifyAdmin} , deleteImage);
   fastify.delete('/delete/work/:id' ,{preHandler: verifyAdmin} , deleteWork);
   fastify.put('/edit/work' ,{preHandler: verifyAdmin} , editWork);
}

export default AdminRoutes;