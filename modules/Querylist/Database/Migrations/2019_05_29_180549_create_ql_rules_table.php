<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateQlRulesTable.
 */
class CreateQlRulesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ql__rules', function(Blueprint $table) {
            $table->increments('id');

            $table->char('type', 15);
            $table->string('title');

            $table->string('url', 500)->nullable();
            $table->text('rules')->nullable();

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
		Schema::drop('ql__rules');
	}
}
