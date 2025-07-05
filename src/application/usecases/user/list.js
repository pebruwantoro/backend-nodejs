export default class ListUsers {
    constructor(userRepository,redisClient){
        this.userRepository = userRepository;
        this.redisClient = redisClient;
    }

    async execute() {
        const cacheKey = 'users:all';
        const cachedUsers = await this.redisClient.get(cacheKey);

        if (cachedUsers) {
            return JSON.parse(cachedUsers);
        }

        const users = await this.userRepository.findAll();
        const sanitizedUsers = users.map(user => {
            user.password = undefined;
            return user;
        });

        await this.redisClient.set(cacheKey, JSON.stringify(sanitizedUsers), {
            EX: 600,
        });

        return sanitizedUsers;
    }
}