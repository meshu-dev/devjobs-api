<?php
namespace App\Repositories\MongoDb;

use App\Interfaces\Repository;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

/**
 * Used to perform CRUD operations on JSON data files.
 */
abstract class EloquentRepository implements Repository
{
    private const ROW_LIMIT = 20;

    protected $model;

    /**
     * Constructor for class.
     *
     * @param Model $model Used to get and set data.
     */
    public function __construct(Eloquent $model)
    {
        $this->model = $model;
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
        $row = $this->model->create($params);

        if (empty($row) === false) {
            return $row;
        }
        return null;
    }

    /**
     * Read data entry from given ID.
     *
     * @param mixed $id The ID for specific data entry.
     *
     * @return array|null
     */
    public function read($id)
    {
        $row = $this->model->find($id);

        if (empty($row) === false) {
            return $row;
        }
        return null;
    }

    /**
     * Read all data entries from JSON to array.
     *
     * @param array $params Used to filter data entries.
     *
     * @return array
     */
    public function readAll(array $params = [])
    {
        $params = $this->model->verifySearchable($params);
        
        if (empty($params['offset']) === false) {
            $offset = (int) $params['offset'];
            unset($params['offset']);
        } else {
            $offset = 0;
        }

        if (empty($params['limit']) === false) {
            $limit = (int) $params['limit'];
            unset($params['limit']);
        } else {
            $limit = self::ROW_LIMIT;
        }

        $rows = $this->model
            ->where($params)
            ->skip($offset)
            ->take($limit)
            ->get();

        if (empty($rows) === false) {
            return $rows;
        }
        return null;
    }

    /**
     * Update existing data entry from given ID.
     *
     * @param mixed $id The ID for specific data entry.
     * @param array $params Parameters used to update data entry.
     *
     * @return array|null
     */
    public function update($id, array $params)
    {
        $row = $this->model->where($this->model->getIdField(), '=', $id)->update($params);

        if (empty($row) === false) {
            return $row;
        }
        return null;
    }

    /**
     * Delete existing data entry from given ID.
     *
     * @param mixed $id The ID for specific data entry.
     *
     * @return void
     */
    public function delete($id)
    {
        return $this->model->destroy($id);
    }

    public function getTotal(array $params = [])
    {
        if (empty($params['offset']) === false) {
            unset($params['offset']);
        }
        
        if (empty($params['limit']) === false) {
            unset($params['limit']);
        }

        return $this->model->where($params)->count();
    }
}
