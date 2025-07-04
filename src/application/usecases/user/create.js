import User from '../../../domain/entities/user.js';
import { UserRole } from '../../../domain/enums/userRole.js';
import bcrypt from 'bcryptjs'

export default class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({ name, email, password, role, createdBy}) {
        if(!Object.values(UserRole).includes(role)) {
            throw new Error('Invalid user role');
        }

        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('Email is already registered')
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User(null, name, email, hashPassword, role, null, null, null, createdBy, null, null);
        return this.userRepository.create(newUser)
    }
}