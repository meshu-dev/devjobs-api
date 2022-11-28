class JobController {
  constructor(jobModel) {
    this.jobModel = jobModel;
  }
  async add(req, res) {
    const repositories = req.body.repositories.filter(Boolean);

    let data = {
      title: req.body.title
    };

    let project = await this.jobModel(data).save();
    res.json(project);
  }

  async get(req, res) {
    let project = await this.jobModel.find({_id: req.params.id});
    res.json(project[0] ? project[0] : {});
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

    let projects = await this.jobModel.find({}, null, options),
      total = await this.jobModel.countDocuments({});

    res.setHeader('X-Total-Count', total);
    res.json(projects);
  }
  
  async edit(req, res) {
    const repositories = req.body.repositories.filter(Boolean);

    let data = {
      title: req.body.title
    };
    let project = await this.jobModel.findOneAndUpdate(
      {_id: req.params.id},
      {$set: data},
      {new: true}
    );
    res.json(project);
  }
  
  async delete(req, res) {
    await this.jobModel.findOneAndDelete({
      _id: req.params.id,
    });
    res.json({});
  }
}

module.exports = JobController;
