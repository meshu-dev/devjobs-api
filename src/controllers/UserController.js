const jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt');

class UserController {
  constructor(userModel) {
    this.userModel = userModel;
  }
  async add(req, res) {
    let data = {
        email: req.body.email,
        password: req.body.password,
      },
      user = this.userModel(data);

    user.password = await bcrypt.hash(user.password, 10);
    user = await user.save();
    res.json(user);
  }

  async get(req, res) {
    let user = await this.userModel.find({_id: req.params.id});
    res.json(user[0] ? user[0] : {});
  }
  
  async getAll(req, res) {
    let params = req.query,
      options = {
        skip: params.skip ? parseInt(params.skip) : 0,
        limit: params.limit ? parseInt(params.limit) : 10,
      };

    if (params.sort) {
      let sortFlag = params.sort === 'asc' ? 1 : -1;
      options.sort = {createdAt: sortFlag};
    }

    let users = await this.userModel.find({}, null, options),
      total = await this.userModel.countDocuments({});

    res.setHeader('X-Total-Count', total);
    res.json(users);
  }
  
  async edit(req, res) {
    let data = {
      email: req.body.email
    };

    if (req.body.password) {
      data.password = await bcrypt.hash(req.body.password, 10);
    }

    let user = await this.userModel.findOneAndUpdate(
      {_id: req.params.id},
      {$set: data},
      {new: true}
    );
    res.json(user);
  }
  
  async delete(req, res) {
    await this.userModel.findOneAndDelete({_id: req.params.id});
    res.json({});
  }
  
  async login(req, res) {
    let username = req.body.username,
      password = req.body.password;

    let users = await this.userModel.find({username: username});

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

module.exports = UserController;
