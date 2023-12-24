import bcrypt from "bcrypt";
import User from "../models/user.js";

class UserService {
    static async createUser (username, email, password) {
        try {
            if (!username || !email || !password) {
                throw { username: 'ValidationError', message: 'All fields are required' };
            }
            const existUser = await User.findOne({email: User.email});
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

    static async loginUser(email, password) {
        try {
            const existUser = await User.findOne({email});
            if (!existUser) {
                throw { username: 'ValidationError', message: 'User not found' };
            }

            const match = bcrypt.compare(password, existUser.password);

            if(!match) {
                throw { username: 'ValidationError', message: 'Incorrect password' };
            }
            const redirectUrl = '/userpage';
            return { message: 'Login successful', redirectUrl };
        }
        catch(error) {
            console.error('Error during user login:', error);
            throw error;
        }
    }
}

export default UserService;