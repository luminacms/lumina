<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;

/**
 * Class CreateCasesTable.
 */
class CreateGamesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('game__games', function(Blueprint $table) {
		    $table->bigIncrements('id');

		    $table->string('cover', 500)->nullable();
		    $table->string('share_pic', 500)->nullable();
            $table->string('name');
            $table->string('desc', 500)->comment('备注')->nullable();
            $table->char('group_name', 35)->nullable();

            $table->char('oauth')->nullable()->comment('页面授权');
            $table->string('img_share')->nullable();
            $table->string('year')->nullable();
            $table->string('month')->nullable();

            $table->timestamp('start_at')->nullable();
            $table->timestamp('end_at')->nullable();

            $table->org();
            $table->createby();
            $table->count();
            $table->status();
            $table->softDeletes();
            $table->timestamps();
		});
        // DB::update("ALTER TABLE `game__games` AUTO_INCREMENT = 1000;");
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('game__games');
	}
}
