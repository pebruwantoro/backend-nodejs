import { Sequelize } from 'sequelize';
import 'dotenv/config';
import UserModel from './models/user.js'
import ProductModel from './models/product.js';

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false
    }
);

const User = UserModel(sequelize, Sequelize);
const Product = ProductModel(sequelize, Sequelize);

User.hasMany(Product, {
    foreignKey: 'sellerId',
    as: 'products'
});

Product.belongsTo(User, {
    foreignKey: 'sellerId',
    as: 'users'
})

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database & tables was creating')
    })


export { sequelize, User, Product }