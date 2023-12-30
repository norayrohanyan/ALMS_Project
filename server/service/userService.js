import bcrypt from "bcrypt";
import User from "../models/User.js";

class UserService {
    static async createUser (username, email, password) {
        try {
            if (!username || !email || !password) {
                throw { username: 'ValidationError', message: 'All fields are required' };
            }
            const existUser = await User.findOne({ email });
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

    static async getUserData(userId) {
        try {
          // Fetch user data based on userId
          const user = await User.findById(userId);
          if (!user) {
            throw { name: 'ValidationError', message: 'User not found' };
          }
    
          // Return relevant user data
          return {
            username: user.username,
            email: user.email,
            // Include other relevant data
          };
        } catch (error) {
          console.error('Error fetching user data:', error);
          throw error;
        }
      }
}

export default UserService;
