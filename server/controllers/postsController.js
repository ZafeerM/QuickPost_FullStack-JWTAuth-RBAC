const getAllPosts = (req, res) => {
  res.status(201).json({ message: `We Will Show Posts Shortly.` });
};

module.exports = { getAllPosts };
