import { User as UserModel } from '../../index.js';
import User from '../../../domain/entities/user.js';
import UserRepository from '../../../application/repositories/userRepository.js';


const _mapToEntity = (userModelInstance) => {
    if (!userModelInstance) {
        return null;
    }
    
    const { id, name, email, password, role, created_at, updated_at, deleted_at, createdBy, updatedBy, deletedBy } = userModelInstance;
    return new User(id, name, email, password, role, created_at, updated_at, deleted_at, createdBy, updatedBy, deletedBy);
};

export default class DatabaseUserRepository extends UserRepository {
    async create(userEntity) {
        const { name, email, password, role, createdBy } = userEntity;

        const newUser = await UserModel.create({
            name,
            email,
            password,
            role,
            createdBy,
        });

        return _mapToEntity(newUser);
    }

    async update(id, updates, updatedBy) {
        const user = await UserModel.findByPk(id);

        if (!user) {
            return null;
        }

        const updatedData = {
            ...updates,
            updatedBy: updatedBy,
        };

        await user.update(updatedData);

        return _mapToEntity(user);
    }

    async delete(id, deletedBy) {
        const user = await UserModel.findByPk(id);

        if (!user) {
            return null;
        }

        await user.update({ deletedBy: deletedBy })

        await user.destroy();

        return true;
    }

    async findById(id) {
        const user = await UserModel.findByPk(id);
        return _mapToEntity(user);
    }

    async findByEmail(email){
        const user = await UserModel.findOne({ where: { email } })
        return _mapToEntity(user);
    }

    async findAll() {
        const users = await UserModel.findAll();
        return users.map(_mapToEntity);
    }
}