<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateBrandsTable.
 */
class CreateBrandsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('shop__brands', function(Blueprint $table) {
            $table->increments('id');

            $table->createby();

            $table->string('name');
            $table->string('name_english')->nullable()->comment('品牌英文名');
            $table->string('reg_num')->nullable()->comment('商标注册号');
            $table->string('logo_src')->nullable();
            $table->string('description', 500)->nullable();

            $table->org();
            $table->status();

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
		Schema::drop('shop__brands');
	}
}
