import bcrypt from "bcrypt";
import User from "../models/User.js";
import TokenService from "./tokenService.js";

class UserService {
    static async createUser (username, email, password) {
        try {
            const existUser = await User.findOne({ email });
            if (existUser) {
                throw { name: 'ValidationError', message: 'User with this email already exists' };
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const user = new User({username, email, password: hashedPassword});
            try {
                const savedUser = await user.save();
                return savedUser;
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
          const existUser = await User.findOne({ email });

          if (!existUser) {
              throw { name: 'UserNotFoundError', message: 'User not found. Please check your email.' };
          }

          const match = await bcrypt.compare(password, existUser.password);

          if (!match) {
              throw { name: 'IncorrectPasswordError', message: 'Incorrect password. Please try again.' };
          }

          const tokens = await TokenService.generateToken(existUser._id, existUser.role);
          return { ...tokens };
      } catch (error) {
          console.error('Error during user login:', error);
          throw error;
      }
  }
  

    static async refresh(refreshToken) {
      try {
        const userData = await TokenService.validateRefreshToken(refreshToken);
        if (!userData) {
          throw { name: 'ValidationError', message: 'User not found' };
        }
        const user = await User.findById(userData.id);
        const tokens =  await TokenService.generateToken(user._id, user.role);
        return {...tokens};
      }
      catch (error) {
        throw error;
      }
    }

    static async getUserData(userId) {
        try {
          const user = await User.findById(userId);
          if (!user) {
            throw { name: 'ValidationError', message: 'User not found' };
          }
    
          return {
            id: user._id,
            username: user.username,
            email: user.email,
          };
        } catch (error) {
          console.error('Error fetching user data:', error);
          throw error;
        }
      }
}

export default UserService;
