<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreatePayTransactionsTable.
 */
class CreatePayTransactionsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('payment__transactions', function(Blueprint $table) {
            $table->bigIncrements('id');

            $table->org();

            $table->string('title', 500)->nullable();
            $table->uuid('transaction_id')->comment('本次交易唯一id');
            $table->string('mch_id')->nullable();
            $table->string('app_id')->nullable();
            $table->status();

            $table->string('model_type')->nullable()->comment('应用ID');
            $table->string('model_order_id')->comment('应用方订单号');

            $table->string('buyer_id')->nullable()->comment('支付方id');
            $table->string('pay_driver')->nullable()->comment('支付方式，可以用来识别支付，如：支付宝、微信、Paypal等');
            $table->string('pay_gateway')->nullable()->comment('app/web/pos/scan');
            $table->string('pay_channel')->nullable()->comment('选择的支付渠道，比如：支付宝中的花呗、信用卡等');

            $table->decimal('total_fee', 12, 2)->unsigned()->comment('支付金额，整数方式保存，单位分')->nullable();
            $table->decimal('pre_total_fee', 12, 2)->unsigned()->comment('支付金额，整数方式保存，单位分');

            $table->char('fee_type', 5)->nullable()->comment('交易的币种');
            $table->timestamp('expired_at')->nullable()->comment('订单过期时间');
            $table->string('transaction_code')->nullable()->comment('真实给第三方的交易code，异步通知的时候更新');
            $table->timestamp('payment_at')->nullable()->comment('第三方支付成功的时间');

            $table->createby();
            $table->ipAddress('create_ip');
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
		Schema::drop('payment__transactions');
	}
}
