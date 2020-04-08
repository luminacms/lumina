<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentHistoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doc__document_history', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->integer('doc_id');
            $table->integer('create_by');
            $table->integer('modify_by')->nullable();

            $table->string('title');
            $table->longText('content')->nullable();
            $table->integer('parentid')->nullable();
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
        Schema::dropIfExists('doc__document_history');
    }
}
