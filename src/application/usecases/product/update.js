export default class UpdateProduct {
    constructor (productRepository) {
        this.productRepository = productRepository;
    }

    async execute({productId, updated, updatedBy}) {
        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new Error('product not found');
        }

        const updatedProduct = await this.productRepository.update(productId, updated, updatedBy);
        return updatedProduct;
    }
}