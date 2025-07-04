import { DataTypes } from 'sequelize';
import { UserRole } from '../../domain/enums/userRole.js';

export default (sequelize) => {
    const User = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM(...Object.values(UserRole)),
            allowNull: false,
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

    return User;
}
