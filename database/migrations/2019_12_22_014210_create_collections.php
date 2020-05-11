<?php
use Jenssegers\Mongodb\Schema\Blueprint;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Hash;

use App\User;

class CreateCollections extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $collection) {
            $collection->index('name');
            $collection->unique('email');
        });

        Schema::create('jobsites', function (Blueprint $collection) {
            $collection->unique('name');
        });

        Schema::create('jobs', function (Blueprint $collection) {
            // No columns defined
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('jobsites');
        Schema::dropIfExists('jobs');
    }
}
