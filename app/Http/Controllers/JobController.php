<?php
namespace App\Http\Controllers;

use App\Repositories\MongoDb\JobRepository;

use Illuminate\Http\Request;

/**
 * A default class used primarmly for the REST API default path.
 */
class JobController extends Controller
{
    /**
     * The constructor for this class.
     *
     * @param Validator $validator Used to verify request parameters.
     * @param Repository $repository Used to get and save data.
     */
    public function __construct(JobRepository $jobRepository)
    {
        $this->repository = $jobRepository;
    }

    /**
     * Create a new data entry with the provided request parameters.
     *
     * @param Request $request The HTTP request data.
     *
     * @return Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        $params = $request->all();

        if (empty($params['jobSiteId']) === true ||
            empty($params['jobId']) === true) {
            return $this->getResponse(
                ['message' => 'Job Id and Job Site Id required to create job'],
                422
            );
        }

        $job = $this->repository->readByJobIds($params['jobSiteId'], $params['jobId']);

        if (empty($job) === false) {
            return $this->getResponse(
                ['message' => 'Job already exists with same Job Site Id and Job Id'],
                409
            );
        }

        $row = $this->repository->create($params);

        return $this->getResponse($row, 201);
    }

    /**
     * Get the data entry associated with the given ID.
     *
     * @param Request $request The HTTP request data.
     * @param integer $id The ID for specific data entry.
     *
     * @return Illuminate\Http\JsonResponse
     */
    public function read(Request $request, string $id)
    {
        $row = $this->repository->read($id);

        return $this->getResponse($row);
    }

    /**
     * Get all data entries.
     *
     * @param Request $request The HTTP request data.
     *
     * @return Illuminate\Http\JsonResponse
     */
    public function readAll(Request $request)
    {
        $params = $request->all();
        $rows = $this->repository->readAll($params);

        $rowTotal = $this->repository->getTotal($params);
        $headers = ['X-Total-Count' => $rowTotal];

        return $this->getResponse(
            $rows,
            200,
            $headers
        );
    }

    /**
     * Update a data entry associated with the given ID.
     *
     * @param Request $request The HTTP request data.
     * @param integer $id The ID for specific data entry.
     *
     * @return Illuminate\Http\JsonResponse
     */
    public function update(Request $request, string $id)
    {
        $params = $request->all();
        $row = $this->repository->update($id, $params);

        return $this->getResponse($row);
    }

    /**
     * Delete a data entry associated with the given ID.
     *
     * @param Request $request The HTTP request data.
     * @param integer $id The ID for specific data entry.
     *
     * @return Illuminate\Http\JsonResponse
     */
    public function delete(Request $request, string $id)
    {
        $result = $this->repository->delete($id);
        $statusCode = empty($result) === false ? '204' : '404';

        return $this->getResponse([], $statusCode);
    }
}
