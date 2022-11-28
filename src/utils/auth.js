let jwt = require('jsonwebtoken');

exports.verify = (req, res, next) => {
  //return next();
  
  if (req.method === 'GET' || req.url === '/users/login') {
    return next();
  }

  let errorResponse = (res, code, msg) => {
    return res.status(code).json({
      message: msg,
    });
  };

  let token = req.headers['authorization'];

  if (token === undefined) {
    return errorResponse(res, 401, 'Authentication required');
  }

  try {
    token = token.replace('Bearer', '');
    token = token.trim();

    const data = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = data;

    next();
  } catch (err) {
    let errMsg = 'Authentication failed! Please try again later',
      statusCode = 500;

    if (err.name === 'TokenExpiredError') {
      errMsg = 'Authentication required';
      statusCode = 401;
    }
    return errorResponse(res, statusCode, errMsg);
  }
};
