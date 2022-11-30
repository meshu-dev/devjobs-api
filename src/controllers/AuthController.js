const jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt');

class AuthController {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async register(req, res) {
    const email = req.body.email;
    const users = await this.userModel.find({ email: email });

    if (users[0]) {
      res.json({
        message: 'Email already belongs to an account'
      });
      return;
    }

    let data = {
      email: email,
      password: req.body.password,
    },
    user = this.userModel(data);

    user.password = await bcrypt.hash(user.password, 10);
    user = await user.save();

    res.json({ success: true });
  }
  
  async login(req, res) {
    let username = req.body.username,
      password = req.body.password;

    let users = await this.userModel.find({ username: username });

    if (users[0]) {
      let user = users[0],
        isCorrect = await bcrypt.compare(password, user.password);

      if (isCorrect === true) {
        let token = jwt.sign(
          { username: username },
          process.env.JWT_PRIVATE_KEY,
          { expiresIn: '24h' }
        );

        let dayInSeconds = 24 * 60 * 60,
          timestamp = Math.round(Date.now() / 1000),
          expiryTime = timestamp + dayInSeconds;

        console.log('Login Token: ' + token);

        res.json({
          token: token,
          expiryTime: expiryTime,
        });
        return;
      }
    }

    res.status(403).json({
      message: 'Username or password is incorrect',
    });
  }
}

module.exports = AuthController;
