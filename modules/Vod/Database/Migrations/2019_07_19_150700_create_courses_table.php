<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateCoursesTable.
 */
class CreateCoursesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('vod__courses', function(Blueprint $table) {
            $table->increments('id');

            $table->string('title');
            $table->decimal('price', 10, 2)->nullable();
            $table->string('cover', 500)->nullable();
            $table->char('status', 15)->nullable();
            $table->string('cover_video', 500)->nullable();

            $table->string('description', 500)->nullable();
            $table->text('content')->nullable();

            $table->org();
            $table->count();
            $table->createby();
            $table->pathtree();
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
		Schema::drop('vod__courses');
	}
}
