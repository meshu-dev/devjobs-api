<?php
namespace App\Repositories\MongoDb;

use App\Repositories\MongoDb\EloquentRepository;
use App\Models\MongoDb\JobModel;

//use MongoDB\BSON\UTCDateTime as MongoDate;

class JobRepository extends EloquentRepository
{
    public function __construct(JobModel $model)
    {
        parent::__construct($model);
    }

    /**
     * Create data entry from array to JSON.
     *
     * @param array $params The parameteres for data entry.
     *
     * @return array|null
     */
    public function create(array $params)
    {
    	JobModel::unguard();

        $row = parent::create($params);

        JobModel::reguard();
    
        return $row;
    }

    public function readByJobIds($jobSiteId, $jobId)
    {
        $rows = $this->readAll([
            'jobSiteId' => $jobSiteId,
            'jobId' => $jobId
        ]);
        return $rows[0] ?? null;
    }
}
