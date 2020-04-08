<?php

namespace Modules\Payment\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Factory;
use Yansongda\Pay\Pay;

// use Modules\Payment\Events;

class PaymentServiceProvider extends ServiceProvider
{
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
        $this->loadMigrationsFrom(__DIR__ . '/../Database/Migrations');
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->register(RouteServiceProvider::class);
        $this->app->register(EventServiceProvider::class);

        $_paymentConfig = config('payment');
        $this->app->singleton('pay.alipay', function () use($_paymentConfig){
            return Pay::alipay([
                'app_id' => option('PAYMENT_ALIPAY_APPID'),
                'notify_url' => option('PAYMENT_ALIPAY_NOTIFY_URL'),
                'return_url' => option('PAYMENT_ALIPAY_RETURN_URL'),
                'ali_public_key' => option('PAYMENT_ALIPAY_PUBLIC_KEY'),
                'private_key' => option('PAYMENT_ALIPAY_PRIVATE_KEY'),
                'log' => $_paymentConfig['alipay']['log']
            ]);
        });
        $this->app->singleton('pay.wechat', function () {
            return Pay::wechat([
                'app_id' => option('WECHAT_APP_ID'),
                'miniapp_id' => option('WECHAT_MINIAPP_ID'),
                'appid' => option('PAYMENT_WECHAT_APPID'),
                'mch_id' => option('PAYMENT_WECHAT_MCH_ID'),
                'notify_url' => option('PAYMENT_WECHAT_NOTIFY_URL'),
                'key' => option('PAYMENT_WECHAT_WECHAT_KEY'),
                'cert_client' => '',
                'cert_key' => ''
            ]);
        });
    }

    /**
     * Register config.
     *
     * @return void
     */
    protected function registerConfig()
    {
        $this->publishes([
            __DIR__.'/../Config/config.php' => config_path('payment.php'),
        ], 'config');
        $this->mergeConfigFrom(
            __DIR__.'/../Config/config.php', 'payment'
        );
    }

    /**
     * Register views.
     *
     * @return void
     */
    public function registerViews()
    {
        $viewPath = resource_path('views/modules/payment');

        $sourcePath = __DIR__.'/../Resources/views';

        $this->publishes([
            $sourcePath => $viewPath
        ],'views');

        $this->loadViewsFrom(array_merge(array_map(function ($path) {
            return $path . '/modules/payment';
        }, \Config::get('view.paths')), [$sourcePath]), 'payment');
    }

    /**
     * Register translations.
     *
     * @return void
     */
    public function registerTranslations()
    {
        $langPath = resource_path('lang/modules/payment');

        if (is_dir($langPath)) {
            $this->loadTranslationsFrom($langPath, 'payment');
        } else {
            $this->loadTranslationsFrom(__DIR__ .'/../Resources/lang', 'payment');
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


    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return ['pay.alipay', 'pay.wechat'];
    }
}
