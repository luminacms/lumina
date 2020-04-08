<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateLessonsTable.
 */
class CreateLessonsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('vod__lessons', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('course_id')->nullable();

            $table->string('title');
            $table->string('cover', 500)->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->time('length')->nullable();
            $table->char('type', 15)->nullable();
            $table->char('pay_type', 15)->nullable();
            $table->string('media_src', 500)->nullable();

            $table->string('description', 500)->nullable();
            $table->text('content');

            $table->org();
            $table->timestamp('start_at')->nullable();
            $table->createby();
            $table->count();
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
		Schema::drop('vod__lessons');
	}
}
