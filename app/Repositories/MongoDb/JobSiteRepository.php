<?php
namespace App\Repositories\MongoDb;

use App\Repositories\MongoDb\EloquentRepository;
use App\Models\MongoDb\JobSiteModel;

class JobSiteRepository extends EloquentRepository
{
    public function __construct(JobSiteModel $model)
    {
        parent::__construct($model);
    }
}
