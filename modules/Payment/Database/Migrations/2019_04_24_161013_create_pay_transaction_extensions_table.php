<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreatePayTransactionExtensionsTable.
 */
class CreatePayTransactionExtensionsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('payment__transaction_extensions', function(Blueprint $table) {
            $table->bigIncrements('id');

            $table->uuid('transaction_id');
            $table->string('pay_driver')->comment('支付方式，可以用来识别支付，如：支付宝、微信、Paypal等');
            $table->string('transaction_code')->comment('生成传输给第三方的订单号');
            $table->integer('call_num')->unsigned()->default(0)->comment('发起调用的次数');
            $table->text('extension_data')->comment('扩展内容，需要保存：transaction_code 与 trade no 的映射关系，异步通知的时候填充');

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
		Schema::drop('payment__transaction_extensions');
	}
}
