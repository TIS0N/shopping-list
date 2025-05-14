const mockAuthMiddleware = (req, res, next) => {
  const userId = req.headers['user-id'];

  if (!userId) {
    return res.status(401).json({ message: 'Missing user-id header' });
  }

  req.userId = userId;
  next();
};

export default mockAuthMiddleware;