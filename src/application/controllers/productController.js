export default class ProductController {
    constructor(createProduct, updateProduct, deleteProduct, detailProduct, listProducts) {
        this.createProductUseCase = createProduct;
        this.updateProductUseCase = updateProduct;
        this.deleteProductUseCase = deleteProduct;
        this.detailProductUseCase = detailProduct;
        this.listProductsUseCase = listProducts;
    }

    async createProduct(req, res) {
        try {
            const createdBy = req.user.id;
            const productData = { ...req.body, sellerId: createdBy, createdBy: createdBy };
            const product = await this.createProductUseCase.execute(productData);
            res.status(201).json({
                success: true,
                message: "success create product",
                data: product.id,
            });
        } catch(error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async updateProduct(req, res) {
        try {
            const productId = Number(req.params.id);
            const updatedBy = req.user.id;
            const product = await this.updateProductUseCase.execute({
                productId: productId,
                updated: req.body,
                updatedBy: updatedBy
            });
            res.status(200).json({
                success: true,
                message: "success update product",
                data: product.id,
            });
        } catch(error){
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async deleteProduct(req, res) {
        try {
            const productId = Number(req.params.id);
            const deletedBy = req.user.id;
            await this.deleteProductUseCase.execute({ productId, deletedBy });
            res.status(204).json({
                success: true,
                message: "success delete Product",
                data: productId
            });
        } catch(error){
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async listProducts(req, res) {
        try {
            const products = await this.listProductsUseCase.execute();
            res.status(200).json({
                success: true,
                message: "success get list products",
                data: products
            });
        } catch (error){
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async getProduct(req, res){
        try {
            const { id } = req.params;
            const product = await this.detailProductUseCase.execute({productId: Number(id)});
            return res.status(200).json({
                success: true,
                message: "success get product detail",
                data: product,
            });
        } catch (error){
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
    }
}