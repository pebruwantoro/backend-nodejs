export default class Product {
    constructor(id, name, description, price, stock, sellerId, createdAt = null, updatedAt = null, deletedAt = null, createdBy = null, updatedBy = null, deletedBy = null){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.sellerId = sellerId;

        // Nullable Audit Fields
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.deletedBy = deletedBy;
    }
}