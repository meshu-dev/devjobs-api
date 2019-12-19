<?php
namespace App\Repositories\MongoDb;

use App\Repositories\MongoDb\EloquentRepository;
use App\Models\JobModel;

class JobRepository extends EloquentRepository
{
    public function __construct(JobModel $model)
    {
        parent::__construct($model);
    }
}
