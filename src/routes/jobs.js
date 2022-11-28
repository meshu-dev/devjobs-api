let express = require('express'),
  router = express.Router(),
  JobController = require('../controllers/JobController'),
  jobController = new JobController(
    require('../models/JobModel')
  );

router.post('/', jobController.add.bind(jobController));
router.get('/:id', jobController.get.bind(jobController));
router.get('/', jobController.getAll.bind(jobController));
router.put('/:id', jobController.edit.bind(jobController));
router.delete('/:id', jobController.delete.bind(jobController));

module.exports = router;
