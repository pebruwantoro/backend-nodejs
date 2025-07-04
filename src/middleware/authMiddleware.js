import jwt from 'jsonwebtoken';
import { UserRole } from '../domain/enums/userRole.js';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            success: false,
            message: 'Unauthorized: No token provided' 
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ 
            success: false,
            message: 'Unauthorized: Invalid token' 
        });
    }
};

const roleMiddleware = (roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ 
            success: false,
            message: 'Forbidden: You do not have the required role' 
        });
    }
    next();
};

const adminMiddleware = roleMiddleware([UserRole.ADMIN]);

const sellerMiddleware = roleMiddleware([UserRole.SELLER]);

export { authMiddleware, roleMiddleware, adminMiddleware, sellerMiddleware };