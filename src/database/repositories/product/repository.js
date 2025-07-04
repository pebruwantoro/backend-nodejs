import { Product as ProductModel } from '../../index.js';
import Product from '../../../domain/entities/product.js';
import ProductRepository from '../../../application/repositories/productRepository.js';


const _mapToEntity = (productModelInstance) => {
    if (!productModelInstance){
        return null;
    }
    
    const { id, name, description, price, stock, sellerId, created_at, updated_at, deleted_at, createdBy, updatedBy, deletedBy } = productModelInstance;
    return new Product(id, name, description, price, stock, sellerId, created_at, updated_at, deleted_at, createdBy, updatedBy, deletedBy);
};

export default class DatabaseProductRepository extends ProductRepository {
    async create(productEntity){
        const { name, description, price, stock, sellerId, createdBy } = productEntity;
        const newProduct = await ProductModel.create({
            name,
            description,
            price,
            stock,
            sellerId,
            createdBy,
        });

        return _mapToEntity(newProduct);
    }

    async update(id, updates, updatedBy) {
        const product = await ProductModel.findByPk(id);

        if (!product) {
            return null;
        }

        const updatedData = {
            ...updates,
            updatedBy: updatedBy,
        };

        await product.update(updatedData);

        return _mapToEntity(product);
    }

    async delete(id, deletedBy) {
        const product = await ProductModel.findByPk(id);

        if (!product) {
            return null;
        }

        await product.update({ deletedBy: deletedBy })

        await product.destroy();

        return true;
    }

    async findById(id) {
        const product = await ProductModel.findByPk(id);
        return _mapToEntity(product);
    }

    async findAll() {
        const products = await ProductModel.findAll()
        return products.map(_mapToEntity)
    }

    async findBySellerId(sellerId) {
        const products = await ProductModel.findAll(
            {
                where: {
                    sellerId: sellerId,
                }
            }
        );

        return products.map(_mapToEntity);
    }
}