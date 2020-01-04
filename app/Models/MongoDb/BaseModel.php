<?php
namespace App\Models\MongoDb;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

use MongoDB\BSON\ObjectId as MongoId;
use MongoDB\BSON\UTCDateTime as MongoDate;

class BaseModel extends Eloquent
{
	private const VALID_PARAMS = [
		'limit',
		'offset'
	];
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
			if (
				in_array($paramName, $this->searchable) === true ||
				in_array($paramName, self::VALID_PARAMS) === true
			) {
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

    protected function toMongoId(string $id)
    {
        return new MongoId($id);
    }

    protected function toMongoDate(string $date)
    {
        $date = str_replace('/', '-', $date);
        $dateTimestamp = strtotime($date) * 1000;

        return new MongoDate($dateTimestamp);
    }
}
