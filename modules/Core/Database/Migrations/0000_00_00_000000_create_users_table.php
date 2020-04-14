<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('core_users', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->char('userid', 64)->unique()->index();

            $table->string('username')->nullable();
            $table->string('name')->nullable();
            $table->string('nickname')->nullable();
            $table->integer('level')->default(0);
            $table->string('mobile')->nullable();
            $table->timestamp('mobile_verified_at')->nullable();
            $table->string('email')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->string('avatar', 500)->nullable();
            $table->boolean('is_admin')->default(0);

            $table->ipAddress('create_ip_at')->nullable()->comment('创建ip');
            $table->timestamp('last_login_at')->nullable()->comment('最后一次登录时间');
            $table->ipAddress('last_login_ip_at')->nullable()->comment('最后一次登录ip');
            $table->integer('login_times')->default(0)->comment('登录次数');
            $table->status();

            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('core_groups', function(Blueprint $table) {
            $table->increments('id');

            $table->string('name');
            $table->string('description', 500);

            $table->timestamps();
        });

        Schema::create('core_group_user', function(Blueprint $table) {
            $table->char('userid', 64)->index();
            $table->string('model_type')->index();
            $table->integer('group_id')->unsigned()->index();
        });

        Schema::create('core_user_socialites', function(Blueprint $table) {
            $table->bigIncrements('id');

            $table->char('userid', 64);

            $table->string('driver');
            $table->string('openid');
            $table->string('anonymous_openid')->nullable();
            $table->string('token')->nullable();
            $table->string('nickname')->comment('昵称');
            $table->string('avatar')->comment('头像');
            $table->string('gender')->nullable();
            $table->string('country')->nullable();
            $table->string('province')->nullable();
            $table->string('city')->nullable();

            $table->org();
            $table->timestamps();

            $table->index('openid');
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('core_groups');
        Schema::drop('core_group_user');
        Schema::drop('core_users');
        Schema::drop('core_user_socialites');
    }
}
