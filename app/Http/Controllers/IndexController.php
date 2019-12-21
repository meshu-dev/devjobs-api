<?php
namespace App\Http\Controllers;

/**
 * A default class used primarmly for the REST API default path.
 */
class IndexController extends Controller
{
    /**
     * Return the current server timestamp.
     *
     * @return Illuminate\Http\JsonResponse
     */
    public function index()
    {
    	return $this->getResponse(['time' => time()]);
    }
}
