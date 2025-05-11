import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import User from '../models/User.js';

const register = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    // Sanitize inputs
    username = validator.escape(username.trim());
    email = validator.normalizeEmail(email.trim());

    // Validation checks
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Sanitize inputs
    email = validator.normalizeEmail(email.trim());

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export { register, login };
