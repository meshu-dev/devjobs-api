class JobSiteController {
  constructor(jobSiteModel) {
    this.jobSiteModel = jobSiteModel;
  }
  async add(req, res) {
    let data = {
      name: req.body.name,
      url: req.body.url,
      searchParams: req.body.searchParams
    };

    let jobSite = await this.jobSiteModel(data).save();
    res.json(jobSite);
  }

  async get(req, res) {
    let jobSite = await this.jobSiteModel.find({_id: req.params.id});
    res.json(jobSite[0] ? jobSite[0] : {});
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

    let jobSites = await this.jobSiteModel.find({}, null, options),
      total = await this.jobSiteModel.countDocuments({});

    res.setHeader('X-Total-Count', total);
    res.json(jobSites);
  }
  
  async edit(req, res) {
    let data = {
      name: req.body.name,
      url: req.body.url,
      searchParams: req.body.searchParams
    };
    let jobSite = await this.jobSiteModel.findOneAndUpdate(
      {_id: req.params.id},
      {$set: data},
      {new: true}
    );
    res.json(jobSite);
  }
  
  async delete(req, res) {
    await this.jobSiteModel.findOneAndDelete({
      _id: req.params.id,
    });
    res.json({});
  }
}

module.exports = JobSiteController;
