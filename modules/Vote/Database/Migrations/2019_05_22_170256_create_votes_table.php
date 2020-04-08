<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateVotesTable.
 */
class CreateVotesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('vote__votes', function(Blueprint $table) {
            $table->increments('id');

            $table->char('uid', 34);

            $table->string('title');
            $table->char('type', 15);

            $table->string('thumb', 500)->nullable();
            $table->char('rule', 10)->nullable();
            $table->integer('rule_times')->nullable();
            $table->text('content')->nullable();
            $table->string('description', 500)->nullable();
            $table->text('topics')->nullable();
            $table->string('addon_fields', 500)->nullable();

            $table->string('notice_webhook')->nullable();
            $table->integer('notice_interval')->nullable();
            $table->timestamp('last_noticed_at')->nullable();

            $table->timestamp('start_at')->nullable();
            $table->timestamp('end_at')->nullable();

            $table->count();
            $table->createby();
            $table->timestamps();
		});

        Schema::create('vote__datas', function(Blueprint $table) {
            $table->bigIncrements('id');

            $table->integer('vote_id');
            $table->createby();

            $table->integer('score')->nullable();

            $table->string('name')->nullable();
            $table->string('nickname')->nullable();
            $table->string('mobile')->nullable();
            $table->string('address')->nullable();
            $table->string('company')->nullable();
            $table->integer('visit_no')->nullable();
            $table->string('invited_by')->nullable();
            $table->text('fields')->nullable();

            $table->ipAddress('create_ip');
            $table->string('agent', 500);

            $table->timestamps();
        });

        Schema::create('vote__model', function (Blueprint $table){
            $table->unsignedInteger('vote_id');

            $table->string('model_type');
            $table->unsignedBigInteger('model_id');

            $table->index(['model_id', 'model_type']);
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('vote__votes');
		Schema::drop('vote__model');
		Schema::drop('vote__datas');
	}
}
