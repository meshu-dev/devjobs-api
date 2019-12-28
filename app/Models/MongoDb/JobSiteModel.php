<?php
namespace App\Models\MongoDb;

class JobSiteModel extends BaseModel
{
    protected $collection = 'jobsites';
    protected $fillable = [
    	'name',
    	'url',
    	'searchParams'
    ];
    protected $searchable = [
    	'name'
    ];
}
