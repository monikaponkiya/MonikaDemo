import { Router } from 'express';
import * as userController from '../controller/user.controller';

export default function () {
    const router = Router();
    console.log('router called..');
    
    router.get('/api/getJobApplications', userController.getJobApplications);
    router.post('/api/login', userController.login);
    router.post('/api/jobApplication', userController.AddJobApplication);
    router.delete('/api/user/:id', userController.deleteJobApplication);
    router.get('/api/user/:id', userController.getJobById);

    return router;
}