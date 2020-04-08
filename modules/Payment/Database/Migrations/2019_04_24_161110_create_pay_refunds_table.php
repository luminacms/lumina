<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreatePayRefundsTable.
 */
class CreatePayRefundsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('payment__refunds', function(Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('app_id')->nullable()->comment('应用ID');
            $table->string('app_refund_no')->comment('上游的退款id');
            $table->uuid('transaction_id')->comment('交易号');
            $table->string('trade_no')->comment('第三方交易号');

            $table->string('refund_no')->comment('支付平台生成的唯一退款单号');
            $table->string('pay_driver')->comment('支付方式，可以用来识别支付，如：支付宝、微信、Paypal等');
            $table->string('pay_channel')->comment('选择的支付渠道，比如：支付宝中的花呗、信用卡等');

            $table->bigInteger('refund_fee')->comment('退款金额');
            $table->string('refund_reason', 500)->comment('退款理由');
            $table->char('currency_code', 5)->comment('币种');
            $table->string('refund_type', 15)->comment('退款类型；0:业务退款; 1:重复退款');
            $table->string('refund_status', 15)->comment('未退款; 1退款处理中; 2退款成功; 3退款不成功');

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
		Schema::drop('payment__refunds');
	}
}
