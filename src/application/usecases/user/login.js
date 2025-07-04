import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default class LoginUser {
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute({ email, password }){
        const user = await this.userRepository.findByEmail(email)
        if (!user){
            throw new Error('Invalid credentials');
        }
        const hashPass = await bcrypt.hash(password, 10)
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch){
            throw new Error('Invalid credentials')
        }

        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d',
        })

        return { token };
    }
}