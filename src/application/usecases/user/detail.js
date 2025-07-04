export default class DetailUser {
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute({userId}) {
        const user = await this.userRepository.findById(userId)
        if (!user){
            throw new Error('user not found');
        }

        user.password = undefined
        return user;
    }
}