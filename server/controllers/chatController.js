import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password')
      .sort('name');
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};