export default class DeleteProduct {
    constructor(productRepository){
        this.productRepository = productRepository;
    }

    async execute({productId, deletedBy}) {
        const product = await this.productRepository.findById(productId);
        if (!product){
            throw new Error('product not found');
        }

        const success = await this.productRepository.delete(productId, deletedBy);
        return success;
    }
}