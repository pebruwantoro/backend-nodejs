import Product from '../../../domain/entities/product.js';

export default class CreateProduct {
    constructor(productRepository, userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    async execute({ name, description, price, stock, sellerId }) {
        const seller = await this.userRepository.findById(sellerId);
        if (!seller) {
            throw new Error('seller not found')
        }
        const productEntity = new Product(null, name, description, price, stock, sellerId, null, null, null, sellerId);
        return this.productRepository.create(productEntity);
    }
}
