const jwt = require('jsonwebtoken');
const User = require('./schema');

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      token: generateToken(user),
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      success: true,
      token: generateToken(user),
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
