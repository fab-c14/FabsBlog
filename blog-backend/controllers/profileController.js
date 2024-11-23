import User from '../models/User.js';

// Get profile details
export const getProfile = async (req, res) => {
  try {
    // Find user by ID (assumes `req.user.id` contains the authenticated user's ID)
    const user = await User.findById(req.user.id).select('-password'); // Exclude the password field

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with user details
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      joinedDate: user.createdAt,
      bio: user.bio || 'No bio provided.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
