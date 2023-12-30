import userService from "../service/userService.js";

class UserController {
    static async createUser(req, res){
        try {
            const { username, email, password } = req.body;
            const user = await userService.createUser( username, email, password);
            res.status(201).json(user);
        } 
        catch (error) {
            if (error.name === 'ValidationError') {
              return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getUserData(req, res) {
        try {
          const userId = req.userId;
          const userData = await userService.getUserData(userId);
          res.status(200).json(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
}

export default UserController;