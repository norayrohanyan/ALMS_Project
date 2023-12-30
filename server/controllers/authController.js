import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class AuthController {
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
      console.log(token);
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error during user login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default AuthController;
