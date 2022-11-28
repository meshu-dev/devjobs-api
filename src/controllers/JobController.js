class JobController {
  constructor(jobSiteModel, jobModel) {
    this.jobSiteModel = jobSiteModel;
    this.jobModel = jobModel;
  }
  async add(req, res) {
    const jobSiteId = req.body.jobSiteId;
    
    let jobSite = await this.jobSiteModel.find({_id: jobSiteId});
    jobSite = jobSite[0] ? jobSite[0] : null;

    if (jobSite) {
      let data = {
        jobSiteId: jobSite.id,
        jobParams: req.body.jobParams
      };
  
      let job = await this.jobModel(data).save();
      res.json(job);
    } else {
      res.json({
        error: "Job Site ID doesn't exist"
      });
    }
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
    let data = {
      jobParams: req.body.jobParams
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
