<?php

namespace Modules\Core\Console;

use Modules\Core\Utils\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;


class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')
        //          ->hourly();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        Artisan::command('inspire', function () {
            $this->comment(Inspiring::quote());
        })->describe('Display an inspiring quote');


        Artisan::command('biu:publish', function(){
            $this->call('cache:clear');
            $this->call('config:cache');
            $this->call('view:clear');
            $this->call('route:cache');
            $this->call('responsecache:clear');
        });
    }
}
