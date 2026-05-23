import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
  const tooken = req.headers.authorization?.replace('Bearer ', '')

  if (!tooken) {
    return res.status(401).json({
      message: 'Necessario fazer login'
    });
  }

  try {
    jwt.verify(tooken, process.env.SECRET);
    next();
  } catch (e) {
    return res.status(401).json({
      message: 'Necessario fazer login'
    })
  }

}

export default authMiddleware;