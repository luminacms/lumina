<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateSpusTable.
 */
class CreateSpusTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('shop__spus', function(Blueprint $table) {
            $table->increments('id');

            $table->char('uid', 40);
            $table->integer('brand_id')->nullable();
            $table->integer('category_id');
            $table->status();
            $table->tinyInteger('type')->default(1);
            $table->string('spec_ids', 500)->nullable();

            $table->string('name');
            $table->string('description', 500)->nullable();
            $table->string('unit')->nullable();
            $table->string('thumb')->nullable();
            $table->text('pic_url')->nullable();

            $table->org();
            $table->createby();

            $table->timestamps();

            $table->unique('uid');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('shop__spus');
	}
}
