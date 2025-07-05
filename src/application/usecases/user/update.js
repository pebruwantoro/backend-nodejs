import { UserRole } from "../../../domain/enums/userRole.js";

export default class UpdateUser {
    constructor(userRepository, redisClient){
        this.userRepository = userRepository;
        this.redisClient = redisClient;
    }

    async execute({userId, updated, updatedBy, requester}) {
        const userToUpdate = await this.userRepository.findById(userId);
        if (!userToUpdate) {
            throw new Error('user not found');
        }

        const isOwner = requester.id === userToUpdate.id;
        const isAdmin = requester.role === UserRole.ADMIN;

        if (!isOwner && !isAdmin) {
            throw new Error('unauthorized: you can only update your own profile');
        }

        if (isAdmin && !isOwner && userToUpdate.role === UserRole.ADMIN) {
            throw new Error('unauthorized: admin cannot update another admin');
        }

        if (updated.role) {
            throw new Error('user role is not permitted to update');
        }

        const updatedUser = await this.userRepository.update(userId, updated, updatedBy);
        await this.redisClient.del('users:all');
        return updatedUser;
    }
}
