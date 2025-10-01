const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');
const News = require('../models/news.models');

//Signup: create chief editor account
const signup = async (req, res) => {
try {
const { firstName, lastName, email, password, role } = req.body;
if (!firstName || !lastName || !email || !password) {
return res.status(400).json({ message: 'All fields are required' });
}

const existing = await User.findOne({ email });
if (existing) return res.status(409).json({ message: 'User already exists' });

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

const user = await User.create({
      firstName, 
      lastName, 
      email, 
      password: hashedPassword, 
      role: role || 'editor',
      });

return res.status(201).json({ message: 'Editor account created', user: { id: user._id, email: user.email, role: user.role } });
} catch (err) {
console.error( "Signup error:", err.message);
res.status(500).json({ message: "Server error"});
}
};

// Login
const login = async (req, res) => {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Input your email and password' });

const user = await User.findOne({ email });
if (!user) return res.status(401).json({ message: 'Invalid credentials' });

const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });


const payload = { id: user._id, role: user.role };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '12d' });


res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
} catch (err) {
console.error("Login error:", err.message);
res.status(500).json({ message: "Server error"});
}
};


// Create News
const createNews = async (req, res) => {
try {
const { title, body } = req.body;
if (!title || !body) return res.status(400).json({ message: 'Title and body are required' });


const news = await News.create({ title, body, author: req.user.id });
res.status(201).json({ message: 'News posted', news });
} catch (err) {
console.error("Create news error:", err.message);
res.status(500).json({ message: "Server error"});
}
};


// Edit News
const editNews = async (req, res) => {
try {
const { id } = req.params;
const { title, body } = req.body;


const news = await News.findById(id);
if (!news) return res.status(404).json({ message: 'News not found' });


// Optionally check ownership or allow editors to edit any
news.title = title || news.title;
news.body = body || news.body;
await news.save();


res.json({ message: 'News updated', news });
} catch (err) {
console.error("Edit news error:", err.message);
res.status(500).json({ message: "Server error"});
}
};


// Delete News
const deleteNews = async (req, res) => {
try {
const { id } = req.params;
const news = await News.findByIdAndDelete(id);

if (!news) {
     return res.status(404).json({ message: 'News not found' });
}

res.json({ message: "News deleted successfully"});
} catch (err) {
console.error("Delete news error:", err.message);
res.status(500).json({ message: "Server error"});
}
};


module.exports = {
  signup,
  login,
  createNews,
  editNews,
  deleteNews,
};
