<?php declare(strict_types=1);

namespace Modules\Core\Providers;

use Illuminate\Support\Facades\DB;
use Xbhub\XGee\XGeeServiceProvider;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use Modules\Core\Services\CoreBlueprint;
use Illuminate\Database\Eloquent\Factory;
use Illuminate\Database\Schema\Blueprint;
use Symfony\Component\Workflow\Registry;
use Symfony\Component\Workflow\Workflow;
use Symfony\Component\Workflow\Transition;
use Symfony\Component\Workflow\DefinitionBuilder;
use Symfony\Component\Workflow\MarkingStore\MethodMarkingStore;
use Symfony\Component\Workflow\SupportStrategy\InstanceOfSupportStrategy;

class CoreServiceProvider extends ServiceProvider
{
    const BUILDER_THEME = 'default';

    /**
     * Boot the application events.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerTranslations();
        $this->registerConfig();
        $this->registerViews();
        $this->registerFactories();
        $this->registerComponents();

        $this->loadMigrationsFrom(__DIR__ . '/../Database/Migrations');

        if ($this->app->runningInConsole()) {
            // migrate中的自定义字段
            $this->registerBlueprint();

            // 注册命令
//            $this->commands([
//                SyncModulePermission::class,
//                WidgetMakeCommand::class,
//            ]);
        }
    }


    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->registerWorkflow();
        if ($this->app->isLocal()) {
            // 开发模式
            // $this->app->register(TelescopeServiceProvider::class);
            $this->app->register(XGeeServiceProvider::class);
            $this->__logSql();
        }
    }

    public function registerBlueprint()
    {
        // registerBlueprint
        Blueprint::macro('createby', function (){ CoreBlueprint::createby($this); });
        Blueprint::macro('pathtree', function (){ CoreBlueprint::pathtree($this); });
        Blueprint::macro('status', function (){ CoreBlueprint::status($this); });
        Blueprint::macro('count', function (){ CoreBlueprint::count($this); });
        Blueprint::macro('sort', function (){ CoreBlueprint::sort($this); });
        Blueprint::macro('org', function (){ CoreBlueprint::org($this); });
        Blueprint::macro('trace', function (){ CoreBlueprint::trace($this); });
    }


    /**
     * Register config.
     *
     * @return void
     */
    protected function registerConfig()
    {
        $this->publishes([
            __DIR__.'/../Config/config.php' => config_path('core.php'),
        ], 'config');
        $this->mergeConfigFrom(
            __DIR__.'/../Config/config.php', 'core'
        );
    }

    /**
     * Register views.
     *
     * @return void
     */
    public function registerViews()
    {
        $viewPath = resource_path('views/modules/core');

        $sourcePath = __DIR__.'/../Resources/views';

        $this->publishes([
            $sourcePath => $viewPath
        ],'views');

        $this->loadViewsFrom(array_merge(array_map(function ($path) {
            return $path . '/modules/core';
        }, \Config::get('view.paths')), [$sourcePath]), 'core');

    }

    /**
     * Register translations.
     *
     * @return void
     */
    public function registerTranslations()
    {
        $langPath = resource_path('lang/modules/core');

        if (is_dir($langPath)) {
            $this->loadTranslationsFrom($langPath, 'core');
        } else {
            $this->loadTranslationsFrom(__DIR__ .'/../Resources/lang', 'core');
        }
    }

    /**
     * Register an additional directory of factories.
     *
     * @return void
     */
    public function registerFactories()
    {
        if (! app()->environment('production')) {
            app(Factory::class)->load(__DIR__ . '/../Database/factories');
        }
    }

    private function __logSql()
    {
        //sql日志记录
        DB::listen(function ($sql) {
            foreach ($sql->bindings as $i => $binding) {
                if ($binding instanceof \DateTime) {
                    $sql->bindings[$i] = $binding->format('\'Y-m-d H:i:s\'');
                } else {
                    if (is_string($binding)) {
                        $sql->bindings[$i] = "'$binding'";
                    }
                }
            }

            // Insert bindings into query
            $query = str_replace(array('%', '?'), array('%%', '%s'), $sql->sql);
            $query = vsprintf($query, $sql->bindings);

            // Save the query to file
            $logFile = fopen(
                storage_path('logs' . DIRECTORY_SEPARATOR . 'query.log'),
                'a+'
            );
            fwrite($logFile, date('Y-m-d H:i:s') . ': ' . $query . PHP_EOL);
            fclose($logFile);
        });
    }

    /**
     * register components
     *
     * @return void
     */
    protected function registerComponents()
    {
        Blade::components([
            \Modules\Core\View\Components\SubMenu::class => 'submenu',
            \Modules\Core\View\Components\Card::class => 'card',

            // Form
            \Modules\Core\View\Components\Region::class => 'region',
            \Modules\Core\View\Components\Form::class => 'form',
            \Modules\Core\View\Components\FormItem::class => 'formItem',

            // Inputs
            \Modules\Core\View\Components\Inputs\Text::class => 'input',
            \Modules\Core\View\Components\Inputs\TextArea::class => 'input.textarea',
            \Modules\Core\View\Components\Inputs\Date::class => 'input.date',
            \Modules\Core\View\Components\Inputs\DateRange::class => 'input.dateRange',
            \Modules\Core\View\Components\Inputs\Rate::class => 'input.rate',
            \Modules\Core\View\Components\Inputs\Select::class => 'input.select',
            \Modules\Core\View\Components\Inputs\Checkbox::class => 'input.checkbox',
            \Modules\Core\View\Components\Inputs\Radio::class => 'input.radio',

            \Modules\Core\View\Components\Inputs\Editor::class => 'input.editor',
            \Modules\Core\View\Components\Inputs\MEditor::class => 'input.meditor',

            \Modules\Core\View\Components\Inputs\Imgs::class => 'input.imgs',

            \Modules\Core\View\Components\Inputs\File::class => 'input.file',
            \Modules\Core\View\Components\Inputs\Media::class => 'input.media',

            // bashboard
            \Modules\Core\View\Components\Dashboards\UserCount::class => 'userCount',
            \Modules\Core\View\Components\Calendar::class => 'calendar',

        ]);
    }

    private function registerWorkflow()
    {
        // 注册状态机
        $this->app->singleton('workflow', function ($app) {
            $registry = new Registry();
            foreach (config('workflow') as $name => $wd) {

                $definitionBuilder = new DefinitionBuilder();

                $definitionBuilder->addPlaces($wd['places']);
                foreach($wd['transitions'] as $tname => $t) {
                    if(is_array($t['from'])) {
                        foreach($t['from'] as $_from) {
                            $definitionBuilder->addTransition(new Transition($tname, $_from, $t['to']));
                        }
                    }else{
                        $definitionBuilder->addTransition(new Transition($tname, $t['from'], $t['to']));
                    }
                }
                $definition = $definitionBuilder->build();

                // $singleState, $property
                $marking = new MethodMarkingStore(true, $wd['marking_store']['property']);
                $workflow = new Workflow($definition, $marking, null, $name);

                foreach ($wd['supports'] as $supportedClass) {
                    $registry->addWorkflow($workflow, new InstanceOfSupportStrategy($supportedClass));
                }
            }
            return $registry;
        });
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return ['workflow'];
    }
}
