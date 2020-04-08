<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateVoteSubjectsTable.
 */
class CreateVoteSubjectsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('vote__subjects', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('vote_id');

            $table->string('title');
            $table->string('tip')->nullable();
            $table->boolean('required');
            $table->string('right_option')->nullable();
            $table->integer('score')->default(0);
            $table->char('type', 15)->nullable();

            $table->sort();
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
		Schema::drop('vote__subjects');
	}
}
