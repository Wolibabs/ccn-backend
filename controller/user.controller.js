const News = require('../models/news.models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.models');

//Genarate Token
const generateToken = (id) => {
return jwt.sign({ id}, process.env.JWT_SECRET, { expiresIn: '12d' });
};

//user signup
exports.signup = async (req, res, next) => {
try {
const { firstName, lastName, email, password } = req.body;

let user = await User.findOne({ email });
if (user) return res.status(400).json({ message: 'User already exists' });

const hashedPassword = await bcrypt.hash(password, 10);

user = await User.create({
     firstName, 
     lastName,
      email, 
      password: hashedPassword,
      role: 'reader'
     });

const token = generateToken(user._id);
res.status(201).json({token, user});
} catch (err) {
next(err);
}
};

//user login
exports.login = async (req, res, next) => {
try {
const { email, password } = req.body;   

const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: 'Invalid credentials' });

const token = generateToken(user._id);
res.json({token, user});
} catch (err) {
next(err);
}
};

// Read all news (public)
exports.getAllNews = async (req, res, next) => {
try {
const news = await News.find().populate('author', 'firstName lastName email').sort({ createdAt: -1 });
res.json({ count: news.length, news });
} catch (err) {
next(err);
}
};


// Read single news
exports.getNewsById = async (req, res, next) => {
try {
const { id } = req.params;
const news = await News.findById(id).populate('author', 'firstName lastName email');
if (!news) return res.status(404).json({ message: 'News not found' });
res.json({ news });
} catch (err) {
next(err);
}
};