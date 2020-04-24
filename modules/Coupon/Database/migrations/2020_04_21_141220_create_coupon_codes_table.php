<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateCouponCodesTable.
 */
class CreateCouponCodesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('coupon__codes', function(Blueprint $table) {
            $table->bigIncrements('id');

            $table->uuid('coupon_id');
            $table->char('code', 32);

            $table->status();

            $table->char('owner_by')->nullable()->comment('拥有人');
            $table->timestamp('received_at')->nullable()->comment('领取时间');
            $table->timestamp('used_at')->nullable()->comment('使用时间');
            $table->ipAddress('used_at_ip')->nullable()->comment('使用坐标');
            $table->timestamp('expired_at')->nullable()->comment('过期时间');


            $table->createby();
            $table->unique('code');

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
		Schema::drop('coupon__codes');
	}
}
