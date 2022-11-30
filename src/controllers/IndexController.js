class IndexController {
  index(req, res) {
    res.json({
      status: 'DevJobs API is running',
    });
  }
}

module.exports = IndexController;
