export default class DetailProduct {
    constructor(productRepository){
        this.productRepository = productRepository;
    }

    async execute({productId}) {
        const product = await this.productRepository.findById(productId)
        if (!product){
            throw new Error('product not found');
        }

        return product;
    }
}