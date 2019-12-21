<?php
namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class BaseModel extends Eloquent
{
	protected $primaryKey = '_id';
	protected $searchable = [];

	public $timestamps = false;

	public function getIdField()
	{
		return $this->primaryKey;
	}

	public function verifySearchable($params)
	{
		$verifiedParams = [];

		foreach ($params as $paramName => $paramValue) {
			if (in_array($paramName, $this->searchable) === true) {
				$verifiedParams[$paramName] = $paramValue;
			}
		}
		return $verifiedParams;
	}

    public function toArray()
    {
        $array = parent::toArray();
        unset($array['_id']);
        
        return ['id' => $this->id] + $array;
    }
}