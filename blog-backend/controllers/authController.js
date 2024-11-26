import User from '../models/User.js';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.SECRET_TOKEN, {
    expiresIn: '1h', // Token expires in 1 hour
  });
};

// Register user
export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({ email, password });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Validate user and password
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



export const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    // Generate a random OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save the OTP to the database or cache (like Redis)
    // For demonstration, we'll log it instead
    console.log(`Generated OTP for ${email}: ${otp}`);

    // Send the OTP via email
    await sendEmail(email, 'Your OTP Code', `Your OTP is: ${otp}`);

    res.status(200).json({ message: 'OTP sent successfully', otp }); // Include `otp` for testing purposes only in development
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP', error });
  }
};

