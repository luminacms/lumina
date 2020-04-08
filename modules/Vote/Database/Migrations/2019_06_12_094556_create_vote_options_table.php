<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateVoteOptionsTable.
 */
class CreateVoteOptionsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('vote__options', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('vote_id');
            $table->integer('subject_id')->nullable();

            $table->string('value')->nullable();
            $table->char('type', 15)->nullable();
            $table->boolean('isright')->default(false);
            $table->string('thumb', 500)->nullable();
            $table->integer('cheat_count')->default(0);

            $table->string('name')->nullable();
            $table->string('mobile')->nullable();
            $table->text('description')->nullable();
            $table->text('profile')->nullable();

            $table->count();
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
		Schema::drop('vote__options');
	}
}
