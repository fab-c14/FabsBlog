import Post from '../models/Post.js'
export const createPost = async (req, res) => {
    const { title, content,author } = req.body;
    const image = req.file ? req.file.filename : null; // Check for the uploaded image
  
    try {
      // Create a new post instance
      const newPost = new Post({
        title,
        content,
        imageUrl: `${req.protocol}://${req.get('host')}/uploads/${image}`, // Build the URL for the image
        author:author
      });
    
      console.log(req.protocol);
      console.log(req.get('host'));
      console.log(image);
  
      // Save the post to the database
      const savedPost = await newPost.save();
  
      res.status(201).json({
        message: 'Post created successfully',
        post: savedPost,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating post', error });
    }
  };
  



export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 6; // Number of posts per page
  const skip = (page - 1) * limit;

  try {
    const totalPosts = await Post.countDocuments();
    const posts = await Post.find()
      .sort({ createdAt: -1 }) // Optional: order by latest first
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),

    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};
