export default class DeleteUser {
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute({userId, deletedBy}) {
        const user = await this.userRepository.findById(userId);
        if (!user){
            throw new Error('user not found');
        }

        const success = await this.userRepository.delete(userId, deletedBy);
        return success;
    }
}