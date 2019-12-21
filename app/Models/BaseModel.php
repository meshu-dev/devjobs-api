<?php
namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class BaseModel extends Eloquent
{
	protected $primaryKey = '_id';

	public $timestamps = false;

	public function getIdField()
	{
		return $this->primaryKey;
	}

    public function toArray()
    {
        $array = parent::toArray();
        unset($array['_id']);
        
        return ['id' => $this->id] + $array;
    }
}