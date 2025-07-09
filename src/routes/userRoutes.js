import { Router } from 'express';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

export default (userController) => {
    const router = Router();

    // USER CONTROLLER PUBLIC
    router.post('/login', (req, res) => userController.login(req, res));
    router.post('/register', (req, res) => userController.registerUser(req, res))

    // USER CONTROLLER AUTHENTICATED USERS
    router.get('/profile', authMiddleware, (req, res) => userController.getProfile(req, res))
    router.get('/:id', authMiddleware, (req, res) => userController.getUser(req, res));
    router.put('/:id', authMiddleware, (req, res) => userController.updateUser(req,res));

    // USER CONTROLLER ADMIN-ONLY
    router.post('/', authMiddleware, adminMiddleware, (req, res) => userController.createUser(req, res));
    router.delete('/:id', authMiddleware, adminMiddleware, (req, res) => userController.deleteUser(req,res));
    router.get('/', authMiddleware, adminMiddleware, (req, res) => userController.listUsers(req, res));

    return router
}