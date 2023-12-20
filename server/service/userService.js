import bcrypt from "bcrypt";
import User from "../models/user.js";

class UserService {
    static async createUser (username, email, password) {
        try {
            if (!username || !email || !password) {
                throw { username: 'ValidationError', message: 'All fields are required' };
            }
            const existUser = await User.findOne(User.email);
            if (existUser) {
                throw { username: 'ValidationError', message: 'User with this email already exists' };
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const user = new User({username, email, password: hashedPassword});
            try {
                const savedUser = await user.save();
                return savedUser
              } 
              catch (error) {
                return { error: 'Error creating user' };
              }

        }
        catch(error) {
            console.error('Error during user registration:', error);
            throw error;
        }
    }
}

export default UserService;