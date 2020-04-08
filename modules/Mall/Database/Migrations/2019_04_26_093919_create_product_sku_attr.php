<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductSkuAttr extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mall__product_sku_attr', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->bigInteger('spu_id');
            $table->bigInteger('sku_id');

            $table->integer('arrt_id');
            $table->integer('arrt_name');
            $table->integer('arrt_value_id');
            $table->integer('arrt_value_name');

            $table->createby();
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
        Schema::dropIfExists('mall__product_sku_attr');
    }
}
