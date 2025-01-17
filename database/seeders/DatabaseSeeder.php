<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->create([
            'name' => 'faqih',
            'email' => 'faqih3935@gmail.com',
            'password' => bcrypt("faqih"),
            'email_verified_at' => time()
        ]);

        Project::factory()->count(30)
            ->hasTasks(30)
            ->create();
    }
}
