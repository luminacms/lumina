<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateFilesTable.
 */
class CreateFilesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('core_files', function(Blueprint $table) {
            $table->bigIncrements('id');

            $table->char('md5', 40)->index();
            $table->char('disk', 15)->nullable();
            $table->string('path', 500);
            $table->string('size')->nullable();
            $table->string('ext', 30);

            $table->createby();
            $table->org();
            $table->timestamps();
        });

        DB::statement("ALTER TABLE core_files COMMENT='文件表'");
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('core_files');
	}
}
