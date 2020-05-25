<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateOrdersTable.
 */
class CreateOrdersTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('shop__orders', function(Blueprint $table) {
            $table->increments('id');

            $table->char('order_id', 20);

            $table->smallInteger('status')->default(0);
            $table->decimal('pre_total_fee', 12, 2)->comment('订单金额');
            $table->decimal('total_fee', 12, 2)->comment('实付金额');
            $table->timestamp('expired_at');
            $table->timestamp('payed_at')->nullable();

            $table->string('express_company')->comment('物流公司');
            $table->string('express_no')->comment('物流单号');

            $table->timestamp('delivery_at')->nullable()->comment('发货时间');
            $table->timestamp('receipt_at')->nullable()->comment('收货时间');
            $table->string('msg', 500)->nullable()->comment('用户留言');
            $table->string('desc', 500)->nullable()->comment('备注');

            $table->createby();
            $table->ipAddress('created_at_ip');
            $table->org();

            $table->unique('order_id');
            $table->timestamps();
        });

        Schema::create('shop__order_skus', function(Blueprint $table) {
            $table->char('order_id', 20);
            $table->char('sku_id', 40);
            $table->integer('number');
            $table->decimal('price_fee', 12, 2);
            $table->decimal('subtotal', 12, 2);

            $table->foreign('order_id')->references('order_id')->on('shop__orders');
        });
        Schema::create('shop__order_address', function(Blueprint $table) {
            $table->increments('id');
            $table->char('order_id', 20);

            $table->string('contact_name')->comment('收货人姓名');
            $table->string('contact_phone')->comment('联系电话');
            $table->string('province')->comment('省');
            $table->string('city')->comment('市');
            $table->string('district')->comment('区');
            $table->string('address')->comment('详细地址');

            $table->foreign('order_id')->references('order_id')->on('shop__orders');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('shop__order_skus');
        Schema::drop('shop__order_address');
		Schema::drop('shop__orders');
	}
}
