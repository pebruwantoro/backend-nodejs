export default class UpdateUser {
    constructor (userRepository) {
        this.userRepository = userRepository;
    }

    async execute({userId, updated, updatedBy}) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('user not found');
        }

        if (updated.role) {
            throw new Error('user role is not permitted to update');
        }

        const updatedUser = await this.userRepository.update(userId, updated, updatedBy);
        return updatedUser;
    }
}