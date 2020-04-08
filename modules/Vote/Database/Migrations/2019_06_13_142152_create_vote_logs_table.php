<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateVoteLogsTable.
 */
class CreateVoteLogsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('vote__logs', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('vote_id');
            $table->integer('subject_id');
            $table->integer('option_id');
            $table->integer('count')->default(0);
            $table->char('deviceid', 40);

            $table->ipAddress('create_ip');
            $table->string('agent', 500);

            $table->createby();
            $table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('vote__logs');
	}
}
