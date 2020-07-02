<?php

use Faker\Generator as Faker;

$factory->define(\Modules\Doc\Models\Project::class, function (Faker $faker) {
    return [
        'project_name' => $faker->text(30),
        'description' => $faker->realText(500),
        'project_open_state' => 1,
        'doc_count' => 0,
        'version' => '1.0',
        'create_by' => 1
    ];
});

$factory->define(\Modules\Doc\Models\Document::class, function (Faker $faker) {
    $project = \Modules\Doc\Models\Project::all();
    $_project_id = $project->random(1)->first()->id;
    $cate = \Modules\Doc\Models\Document::where('project_id', $_project_id)->get();
    return [
        'project_id' => $_project_id,
        'parentid' => 0,
        'title' => $faker->text(35),
        'content' => $faker->realText(500),
        'version' => '1.0',
        'create_by' => 1
    ];
});
