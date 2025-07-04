import { Router } from 'express';
import { authMiddleware, adminMiddleware, sellerMiddleware } from '../middleware/authMiddleware.js';

export default (productController) => {
    const router = Router();

    router.post('/', authMiddleware, sellerMiddleware, (req, res) => productController.createProduct(req, res));
    router.put('/:id', authMiddleware, sellerMiddleware, (req, res) => productController.updateProduct(req, res));
    router.delete('/:id', authMiddleware, sellerMiddleware, (req, res) => productController.deleteProduct(req, res));
    router.get('/', authMiddleware, (req, res) => productController.listProducts(req, res));
    router.get('/:id', authMiddleware, (req, res) => productController.getProduct(req, res));

    return router;
}