class IndexController {
  index(req, res) {
    res.json({
      status: 'API is fine',
    });
  }
}

module.exports = IndexController;
