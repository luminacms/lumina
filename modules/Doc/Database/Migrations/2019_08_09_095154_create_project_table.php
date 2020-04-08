<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doc__project', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('project_name');
            $table->integer('create_by');

            $table->string('description', 500);
            $table->text('doc_tree')->nullable();
            $table->smallInteger('project_open_state')->default(0);
            $table->string('project_password')->nullable();
            $table->integer('doc_count')->default(0);
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
        Schema::dropIfExists('doc__project');
    }
}
