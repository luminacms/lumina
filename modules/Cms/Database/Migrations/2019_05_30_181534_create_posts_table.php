<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreatePostsTable.
 */
class CreatePostsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('cms__posts', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('category_id');

            $table->string('title');
            $table->timestamp('post_at')->nullable();
            $table->string('author')->nullable();
            $table->string('origin')->nullable();
            $table->string('description', 500)->nullable();
            $table->text('content');
            $table->string('thumb', 500)->nullable();

            $table->createby();
            $table->status();
            $table->sort();

            $table->count();
            $table->softDeletes();
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
		Schema::drop('cms__posts');
	}
}
