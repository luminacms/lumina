<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doc__document', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->integer('project_id');
            $table->integer('create_by');

            $table->integer('parentid');
            $table->string('title');
            $table->longText('content')->nullable();
            $table->integer('sort')->default(50);
            $table->string('version')->nullable();

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
        Schema::dropIfExists('doc__document');
    }
}
