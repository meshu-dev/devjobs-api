<?php
namespace App\Http\Controllers;

/**
 * A default class used primarmly for the REST API default path.
 */
class JobController
{
    /**
     * The constructor for this class.
     *
     * @param Validator $validator Used to verify request parameters.
     * @param Repository $repository Used to get and save data.
     */
    public function __construct(JobRepository $jobRepository)
    {
        $this->jobRepository = $jobRepository;
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
        $validationResult = $this->validator->validateCreate($params);

        if ($validationResult !== true) {
            return $this->getResponse($validationResult, false);
        }
        $result = $this->repository->create($params);

        return $this->getResponse([$this->rowName => $result]);
    }

    /**
     * Get the data entry associated with the given ID.
     *
     * @param Request $request The HTTP request data.
     * @param integer $id The ID for specific data entry.
     *
     * @return Illuminate\Http\JsonResponse
     */
    public function read(Request $request, int $id)
    {
        $validationResult = $this->validator->checkIdExists($id);

        if ($validationResult !== true) {
            return $this->getResponse($validationResult, false);
        }
        $result = $this->repository->read($id);

        return $this->getResponse([$this->rowName => $result]);
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
        $result = $this->repository->readAll($params);

        return $this->getResponse([$this->listName => $result]);
    }

    /**
     * Update a data entry associated with the given ID.
     *
     * @param Request $request The HTTP request data.
     * @param integer $id The ID for specific data entry.
     *
     * @return Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id)
    {
        $params = $request->all();
        $validationResult = $this->validator->validateUpdate($id, $params);

        if ($validationResult !== true) {
            return $this->getResponse($validationResult, false);
        }
        $result = $this->repository->update($id, $params);

        return $this->getResponse([$this->rowName => $result]);
    }

    /**
     * Delete a data entry associated with the given ID.
     *
     * @param Request $request The HTTP request data.
     * @param integer $id The ID for specific data entry.
     *
     * @return Illuminate\Http\JsonResponse
     */
    public function delete(Request $request, int $id)
    {
        $validationResult = $this->validator->checkIdExists($id);

        if ($validationResult !== true) {
            return $this->getResponse($validationResult, false);
        }
        $result = $this->repository->delete($id);

        return $this->getResponse(['is_deleted' => $result]);
    }
}
