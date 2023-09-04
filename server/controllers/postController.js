const { Activity } = require('../models/models.js');

const postController = {};

// TEST ROUTE FOR ALL POSTS
postController.getAllPosts = async (req, res, next) => {
  console.log('entered getAllPosts');
  try {
    const allPosts = await Activity.find({}).populate('userID');
    res.locals.allPosts = allPosts;
    return next();
  } catch (error) {
    return next({
      log: `postController.getAllPosts: ERROR ${error}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

// GET ALL POSTS filtered by preference
postController.getFilteredPosts = async (_, res, next) => {
  console.log('entered getFilteredPosts');
  try {
    const postData = await Activity.Post.find({
      preference: {
        $in: user.preferences,
      },
    });
    res.locals.filteredPosts = postData;
    return next();
  } catch (err) {
    return next({
      log: `postController.getfilteredPosts: ERROR ${error}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

// CREATE NEW POST
postController.createPost = async (req, res, next) => {
  const { userName, preference, image, description } = req.body;
  try {
    const postData = await Activity.Post.create({
      userName,
      preference,
      image,
      description,
    });
    res.locals.newPost = postData;
    return next();
  } catch (err) {
    return next({
      log: `postController.getfilteredPosts: ERROR ${error}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

// UPDATE POST
postController.updatePost = async (req, res, next) => {
  const { id } = req.params;
  //TODO: We might need a separate update controller for comments
  const { preference, image, description } = req.body;
  const filter = { _id: id };
  const update = { preference, image, description };

  try {
    const updatedPostData = await Activity.Post.findOneAndUpdate(
      filter,
      update,
      {
        returnNewDocument: true,
      },
    );
    res.locals.updatedPost = updatedPostData;
    return next();
  } catch (err) {
    return next({
      log: `postController.updatePost: ERROR ${error}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

// DELETE POST
postController.deletePost = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedPostData = await Activity.Post.findOneAndDelete({ _id: id });
    res.locals.deletedPost = deletedPostData;
    return next();
  } catch (err) {
    return next({
      log: `postController.updatePost: ERROR ${error}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

module.exports = postController;
