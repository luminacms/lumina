<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateDepartmentsTable.
 */
class CreateDepartmentsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('core_departments', function(Blueprint $table) {
            $table->increments('id');

            $table->string('name');

            $table->org();
            $table->sort();
            $table->pathtree();
            $table->timestamps();
		});

        Schema::create('core_department_user', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('department_id');
            $table->char('userid', 64);
        });

        DB::statement("ALTER TABLE core_departments COMMENT='部门表'");
        DB::statement("ALTER TABLE core_department_user COMMENT='部门用户关联表'");

	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('core_departments');
		Schema::drop('core_department_user');
	}
}
