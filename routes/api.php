<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
}); */

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

$router->get('/', 'IndexController@index');

$router->post('/job-sites', 'JobSiteController@create');
$router->get('/job-sites', 'JobSiteController@readAll');
$router->get('/job-sites/{id}', 'JobSiteController@read');
$router->put('/job-sites/{id}', 'JobSiteController@update');
$router->delete('/job-sites/{id}', 'JobSiteController@delete');

$router->post('/jobs', 'JobController@create');
$router->get('/jobs', 'JobController@readAll');
$router->get('/jobs/{id}', 'JobController@read');
$router->put('/jobs/{id}', 'JobController@update');
$router->delete('/jobs/{id}', 'JobController@delete');
