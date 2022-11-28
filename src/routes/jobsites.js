let express = require('express'),
  router = express.Router(),
  JobSiteController = require('../controllers/JobSiteController'),
  jobSiteController = new JobSiteController(
    require('./../models/JobSiteModel')
  );

router.post('/', jobSiteController.add.bind(jobSiteController));
router.get('/:id', jobSiteController.get.bind(jobSiteController));
router.get('/', jobSiteController.getAll.bind(jobSiteController));
router.put('/:id', jobSiteController.edit.bind(jobSiteController));
router.delete('/:id', jobSiteController.delete.bind(jobSiteController));

module.exports = router;
