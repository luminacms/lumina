<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('core_regions', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('parentid');
            $table->string('shortname')->nullable()->comment('简称');
            $table->string('name')->nullable()->comment('名称');
            $table->string('merger_name')->nullable()->comment('全称');
            $table->tinyInteger('level')->nullable()->comment('层级 1 2 3 省市区县');
            $table->string('pinyin')->nullable()->comment('拼音');
            $table->string('code')->nullable()->comment('长途区号');
            $table->string('zip_code')->nullable()->comment('邮编');
            $table->string('first')->nullable()->comment('首字母');
            $table->string('lng')->nullable()->comment('经度');
            $table->string('lat')->nullable()->comment('纬度');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('core_regions');
    }
}
