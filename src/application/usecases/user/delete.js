export default class DeleteUser {
    constructor(userRepository, redisClient){
        this.userRepository = userRepository;
        this.redisClient = redisClient;
    }

    async execute({userId, deletedBy}) {
        const user = await this.userRepository.findById(userId);
        if (!user){
            throw new Error('user not found');
        }

        const success = await this.userRepository.delete(userId, deletedBy);
        await this.redisClient.del('users:all');
        return success;
    }
}