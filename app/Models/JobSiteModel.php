<?php
namespace App\Models;

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
