import userService from "../service/userService.js";

class UserController {
    static async createUser(req, res){
        try {
            const { username, email, password } = req.body;
            const user = userService.createUser( username, email, password);
            res.status(201).json(user);
        } 
        catch (error) {
            if (error.name === 'ValidationError') {
              return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async loginUser(req, res) {
        try {
            const {email, password} = req.body;
            const user = userService.loginUser(email, password);
            res.status(200).json(user);
        }
        catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(401).json({ error: error.message }); 
            }
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default UserController;