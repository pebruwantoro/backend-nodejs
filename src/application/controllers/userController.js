export default class UserController {
    constructor(createUser, updateUser, deleteUser, detailUser, listUsers, login){
        this.createUserUseCase = createUser;
        this.updateUserUseCase = updateUser;
        this.deleteUserUseCase = deleteUser;
        this.detailUserUseCase = detailUser;
        this.listUsersUseCase = listUsers;
        this.loginUserUseCase = login;
    }

    async createUser(req, res) {
        try {
            const data = req.body;
            data.createdBy = req.user.id
            const user = await this.createUserUseCase.execute(data);
            res.status(201).json({
                success: true,
                message: "success create user",
                data: user.id,
            });
        } catch(error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async updateUser(req, res) {
        try {
            const userId = Number(req.params.id);
            const updatedBy = req.user.id;
            const user = await this.updateUserUseCase.execute({
                userId: userId,
                updated: req.body,
                updatedBy: updatedBy,
                requester: req.user
            });
            res.status(200).json({
                success: true,
                message: "success update user",
                data: user.id,
            });
        } catch(error){
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = Number(req.params.id);
            const deletedBy = req.user.id;
            if (userId == req.user.id) {
                return res.status(401).json({
                    success: false,
                    message: "unauthorized delete data",
                })
            }
            
            await this.deleteUserUseCase.execute({ userId, deletedBy });
            res.status(204).json({
                success: true,
                message: "success delete user",
                data: userId
            });
        } catch(error){
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async listUsers(req, res) {
        try {
            const users = await this.listUsersUseCase.execute();
            res.status(200).json({
                success: true,
                message: "success list users",
                data: users
            });
        } catch (error){
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async getUser(req, res){
        try {
            const { id } = req.params;
            if (id != req.user.id) {
                return res.status(401).json({
                    success: false,
                    message: "unauthorized get data",
                })
            }
            const user = await this.detailUserUseCase.execute({userId: Number(id)});
            return res.status(200).json({
                success: true,
                message: "success get user detail",
                data: user,
            });
        } catch (error){
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
    }

    async login(req, res){
        try {
            const { email, password } = req.body;
            const result = await this.loginUserUseCase.execute({ email, password })
            res.status(200).json({
                success: true,
                message: "success login",
                data: result
            })
        } catch (error){
            return res.status(401).json({
                success: false,
                message: error.message,
            });
        }
    }
}