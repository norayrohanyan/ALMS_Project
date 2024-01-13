import TokenService from '../service/tokenService.js';

export default async function (req, res, next) {
  try {
    const token = req.headers.authorization;

  if (!token) {
    return next(res.status(401).json({ error: 'Unauthorized' }));
  }

  const accessToken = token;

  const userData = await TokenService.validateAccessToken(accessToken);
  if (!userData) {
    return next(res.status(401).json({ error: 'Unauthorized' }));
  }

  req.user = userData;
  next();
  
  } catch (error) {
    next(error);
  }
};
