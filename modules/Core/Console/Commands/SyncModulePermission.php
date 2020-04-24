<?php declare(strict_types=1);

namespace Modules\Core\Console\Commands;

use Illuminate\Console\Command;
use Modules\Core\Models\Permission;
use Modules\Core\Models\Role;
use Nwidart\Modules\Facades\Module;
use Nwidart\Modules\Module as ModulesModule;

class SyncModulePermission extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'biu:sync_modules';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'sync module setting';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        foreach (Module::getByStatus(true) as $_module) {
            $_name = $_module->getAlias();
            if($_name != 'core') {
                Permission::updateOrCreate(['name' => 'module_'.$_name], [
                    'name' => 'module_'.$_name,
                    'label' => $_module->get('description') ?: $_name,
                    'guard_name' => 'org'
                ]);
            }
        }
    }
}
