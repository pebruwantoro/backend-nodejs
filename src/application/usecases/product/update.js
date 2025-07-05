export default class UpdateProduct {
    constructor(productRepository,redisClient){
        this.productRepository = productRepository;
        this.redisClient = redisClient;
    }

    async execute({productId, updated, updatedBy}) {
        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new Error('product not found');
        }

        const updatedProduct = await this.productRepository.update(productId, updated, updatedBy);
        await this.redisClient.del('products:all')
        return updatedProduct;
    }
}