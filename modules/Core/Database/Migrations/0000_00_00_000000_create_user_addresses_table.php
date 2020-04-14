<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateUserAddressesTable.
 */
class CreateUserAddressesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('core_user_addresses', function(Blueprint $table) {
            $table->increments('id');

            $table->char('userid', 64);
            $table->string('province');
            $table->string('city');
            $table->string('district');
            $table->string('address', 500);
            $table->unsignedInteger('zip')->nullable();
            $table->string('contact_name');
            $table->string('contact_phone');
            $table->timestamp('lastused_at')->nullable();

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
		Schema::drop('core_user_addresses');
	}
}
