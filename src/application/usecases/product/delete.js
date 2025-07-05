export default class DeleteProduct {
    constructor(productRepository, redisClient){
        this.productRepository = productRepository;
        this.redisClient = redisClient;
    }

    async execute({productId, deletedBy}) {
        const product = await this.productRepository.findById(productId);
        if (!product){
            throw new Error('product not found');
        }

        const success = await this.productRepository.delete(productId, deletedBy);
        await this.redisClient.del('products:all')
        return success;
    }
}