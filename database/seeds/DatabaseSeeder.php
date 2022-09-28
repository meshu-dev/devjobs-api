<?php

use Illuminate\Database\Seeder;

use App\Models\MongoDb\UserModel;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $params = [
            'name' => 'test',
            'email' => 'test@gmail.com',
            'password' => Hash::make('12345')
        ];
        UserModel::create($params);
    }
}
