import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Product = sequelize.define('products', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        sellerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'seller_id',
            references: {
                model: 'users',
                key: 'id'
            }
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'created_by'
        },
        updatedBy: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'updated_by'
        },
        deletedBy: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'deleted_by'
        },
    }, {
        timestamps: true, 
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    });

    return Product;
}
