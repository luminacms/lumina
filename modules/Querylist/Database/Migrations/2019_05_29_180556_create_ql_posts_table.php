<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateQlPostsTable.
 */
class CreateQlPostsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ql__posts', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('rule_id');
            $table->string('uuid', 60);

            $table->string('title');
            $table->string('url', 500)->nullable();
            $table->string('origin')->nullable();
            $table->timestamp('post_at')->nullable();

            $table->text('fields')->nullable();
            $table->text('content')->nullable();

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
		Schema::drop('ql__posts');
	}
}
