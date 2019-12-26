<?php
namespace App\Models;

class JobModel extends BaseModel
{
    protected $collection = 'jobs';
    protected $searchable = [
    	'jobId',
    	'jobSiteId'
    ];
}