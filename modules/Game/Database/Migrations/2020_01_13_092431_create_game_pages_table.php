<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateGamePagesTable.
 */
class CreateGamePagesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('game__pages', function(Blueprint $table) {
            $table->bigIncrements('id');

            $table->bigInteger('game_id');

            $table->char('uid', 20);
            $table->char('mode', '15')->default('source')->comment('h5模式，source/diy');
            $table->string('title')->nullable();
            $table->string('desc')->nullable();

            $table->text('content')->nullable()->comment('源码内容');
            $table->text('content_draft')->nullable()->comment('源码内容草稿');
            $table->text('diy_content')->nullable()->comment('diy节点页面json数据');
            $table->text('diy_content_draft')->nullable()->comment('diy节点页面json数据草稿');

            $table->char('oauth')->nullable()->comment('页面授权');

            $table->string('share_img', 500)->nullable();
            $table->string('share_title', 50)->nullable();
            $table->string('share_desc', 500)->nullable();

            $table->timestamp('start_at')->nullable();
            $table->timestamp('end_at')->nullable();

            $table->string('cover', 500)->nullable();
            $table->char('status', 15)->default('down');

            $table->org();
            $table->createby();
            $table->count();

            $table->index('uid')->unique();
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
		Schema::drop('game__pages');
	}
}
