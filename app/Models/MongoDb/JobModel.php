<?php
namespace App\Models\MongoDb;

class JobModel extends BaseModel
{
    protected $collection = 'jobs';
    protected $searchable = [
    	'jobId',
    	'jobSiteId',
        'isFavourited'
    ];

    public function create($data)
    {
    	$data['date'] = $this->toMongoDate($data['date']);
        $data['expirationDate'] = $this->toMongoDate($data['expirationDate']);
		$data['jobSiteId'] = $this->toMongoId($data['jobSiteId']);

	    return parent::create($data);
	}
}
