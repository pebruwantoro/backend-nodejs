export default class ListProducts {
    constructor(productRepository, redisClient){
        this.productRepository = productRepository;
        this.redisClient = redisClient;
    }

    async execute() {
        const cacheKey = 'products:all';
        const cachedProducts = await this.redisClient.get(cacheKey);

        if (cachedProducts) {
            return JSON.parse(cachedProducts);
        }

        const products = await this.productRepository.findAll();
        await this.redisClient.set(cacheKey, JSON.stringify(products), {
            EX: 600,
        });

        return products;
    }
}