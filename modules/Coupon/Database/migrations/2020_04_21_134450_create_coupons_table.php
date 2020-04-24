<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateCouponsTable.
 */
class CreateCouponsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('coupon__coupons', function(Blueprint $table) {
            $table->increments('id');

            $table->uuid('uid');
            $table->org();

            $table->string('title');

            $table->char('type', 15)->comment('无条件立减/满减/折扣券');
            $table->text('type_value')->nullable();

            $table->char('range', 15)->comment('使用范围：全场/指定商品/指定品类');
            $table->text('range_value')->nullable();

            $table->char('expired_type')->comment('时效: 固定时效/领取后一段时间');
            $table->text('expired_type_value')->nullable();

            $table->timestamp('start_at')->nullable();
            $table->timestamp('end_at')->nullable();
            $table->integer('times')->nullable()->comment('领取次数：无限制/n次');

            $table->string('desc', 500)->nullable();
            $table->status();
            $table->createby();

            $table->unique('uid');
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
		Schema::drop('coupon__coupons');
	}
}
