import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import DatabaseProductRepository from './database/repositories/product/repository.js';
import DatabaseUserRepository from './database/repositories/user/repository.js';
import './database/index.js';

import { CreateUser, UpdateUser, DeleteUser, DetailUser, ListUsers, LoginUser, CreateProduct, UpdateProduct, DeleteProduct, DetailProduct, ListProducts } from './application/usecases/index.js';

import UserController from './application/controllers/userController.js';
import ProductController from './application/controllers/productController.js'

import UserRouter from './routes/userRoutes.js';
import ProductRouter from './routes/productRouters.js';

import redisClient from './redis/redis.js';

const app = express();
app.use(cors());
app.use(express.json());

const userRepository = new DatabaseUserRepository();
const productRepository = new DatabaseProductRepository();

const createUserUseCase = new CreateUser(userRepository);
const updateUserUseCase = new UpdateUser(userRepository, redisClient);
const deleteUserUseCase = new DeleteUser(userRepository, redisClient);
const detailUserUseCase = new DetailUser(userRepository);
const listUsersUseCase = new ListUsers(userRepository, redisClient);
const loginUserUseCase = new LoginUser(userRepository);

const createProductUseCase = new CreateProduct(productRepository, userRepository);
const updateProductUseCase = new UpdateProduct(productRepository, redisClient);
const deleteProductUseCase = new DeleteProduct(productRepository, redisClient);
const detailProductUseCase = new DetailProduct(productRepository);
const listProductsUseCase = new ListProducts(productRepository, redisClient);

const userController = new UserController(
    createUserUseCase,
    updateUserUseCase,
    deleteUserUseCase,
    detailUserUseCase,
    listUsersUseCase,
    loginUserUseCase,
);

const productController = new ProductController(
    createProductUseCase,
    updateProductUseCase,
    deleteProductUseCase,
    detailProductUseCase,
    listProductsUseCase,
);

const userRouter = UserRouter(userController);
const productRouter = ProductRouter(productController);

app.use('/v1/api/users', userRouter)
app.use('/v1/api/products', productRouter)

const PORT = process.env.APP_PORT || 8080;
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT: ${PORT}`)
});