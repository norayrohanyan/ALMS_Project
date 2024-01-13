import userService from "../service/userService.js";
import { validationResult } from 'express-validator';

class UserController {
    static async createUser(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); 
      }

      const { username, email, password } = req.body;
      const user = await userService.createUser(username, email, password);
      res.status(201).json(user);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


    static async loginUser(req, res) {
      try {
          const { email, password } = req.body;
          const user = await userService.loginUser(email, password);
          res.status(200).json(user);
      } 
      catch (error) {
          if (error.name === 'UserNotFoundError') {
              return res.status(404).json({ error: 'User not found. Please check your email.' });
          } else if (error.name === 'IncorrectPasswordError') {
              return res.status(401).json({ error: 'Incorrect password. Please try again.' });
          } else {
              console.error('Error during user login:', error);
              res.status(500).json({ error: 'Internal Server Error' });
          }
      }
    }

    static async refresh(req, res) {
      try { 
        const {refreshToken} = req.body;
        const user = await userService.refresh(refreshToken);
        res.status(200).json(user);
      } 
      catch(error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }

    static async getUserData(req, res) {
        try {
          const userId = req.user.id;
          const userData = await userService.getUserData(userId);
          res.status(200).json(userData);
        } 
        catch (error) {
          console.error('Error fetching user data:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
}

export default UserController;