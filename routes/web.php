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

Route::get('/', 'IndexController@index');

Route::group(
	['middleware' => 'api'],
	function ($router) {
	    Route::group(['prefix' => 'auth'], function () {
		    Route::post('login', 'AuthController@login');
		    Route::post('logout', 'AuthController@logout');
		    Route::post('refresh', 'AuthController@refresh');
		    Route::post('me', 'AuthController@me');
	    });

	    Route::group(['prefix' => 'job-sites'], function () {
	    	$controller = 'JobSiteController';
		    Route::post('/', "$controller@create");
		    Route::get('/', "$controller@readAll");
		    Route::get('/{id}', "$controller@read");
		    Route::put('/{id}', "$controller@update");
		    Route::delete('/', "$controller@delete");
	    });

	    Route::group(['prefix' => 'jobs'], function () {
	    	$controller = 'JobController';
		    Route::post('/', "$controller@create");
		    Route::get('/', "$controller@readAll");
		    Route::get('/{id}', "$controller@read");
		    Route::put('/{id}', "$controller@update");
		    Route::delete('/', "$controller@delete");
	    });
	}
);
