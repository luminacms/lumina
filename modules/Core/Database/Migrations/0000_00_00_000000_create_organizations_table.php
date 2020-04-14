<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateOrganizationsTable.
 */
class CreateOrganizationsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('core_organizations', function(Blueprint $table) {
            $table->increments('id');

            $table->string('name')->unique();

            $table->createby();
            $table->org();
            $table->sort();
            $table->pathtree();
            $table->timestamps();
		});

        Schema::create('core_organzation_user', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('organzation_id', 32);
            $table->char('userid', 64);
        });

        DB::statement("ALTER TABLE core_organizations COMMENT='组织表'");
        DB::statement("ALTER TABLE core_organzation_user COMMENT='组织人员关联表'");

	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('core_organizations');
		Schema::drop('core_organzation_user');
	}
}
