import User from '../models/userModel.js';
import History from '../models/historyModel.js';
import bcrypt from 'bcrypt';

export const getregister=(req, res) =>{ 
  res.render('register');
}
export const postRegister= async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'User already exists' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    
    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
} 
export const getLogin=(req, res) => {
  res.render('login');
}

export const postLogin=async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'All fields are required' });
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });
    
    req.session.userId = user._id;
    
    
    await History.create({
      userId: user._id,
      action: "Login",
      details: "User logged in"
    });
    
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
} 

export const getlogout=(req, res) => {
  req.session.destroy(() => res.redirect('/login'));
} 
export const signOut=(req, res) => {
  req.session.destroy(() => res.redirect('/login'));
}