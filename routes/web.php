<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

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
