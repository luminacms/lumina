<?php

namespace Modules\Vote\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'Modules\Vote\Models\VoteOption' => 'Modules\Vote\Policies\VoteOptionPolicy',
        'Modules\Vote\Models\Vote' => 'Modules\Vote\Policies\VotePolicy',
        'Modules\Vote\Models\VoteData' => 'Modules\Vote\Policies\VoteDataPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
