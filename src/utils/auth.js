const jwt = require('jsonwebtoken');

exports.verify = (req, res, next) => {
  const publicUrls = [
    '/auth/register',
    '/auth/login',
    '/'
  ];
  
  if (req.url.indexOf('/images') === 0 ||
    publicUrls.includes(req.url) === true
  ) {
    return next();
  }

  console.log('Checked URL', req.url);

  let errorResponse = (res, code, msg) => {
    return res.status(code).json({
      message: msg,
    });
  };

  let token = req.headers['authorization'];

  //console.log('token', req.headers['authorization'], req.headers);

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
