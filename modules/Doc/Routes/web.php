<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// frontend
Route::group(["prefix" => "doc", "as" => "doc."], function () {

    Route::get("/search", "SearchController@search")->name("search.search");

    Route::get("/", "DocController@index")->name("index");
    Route::get("/{id}","DocController@show")->name("show");

    Route::get("/section/{id}", "DocumentController@show")->name("document.show");
    Route::get("/export/{id}", "DocumentController@export")->name("document.export");
    Route::post("/check_document_auth", "HomeController@checkDocumentAuth")->name("check_document_auth");

});

// backend

Route::group(["prefix" => "backend/doc", "as" => "backend.doc.", "middleware" => ["auth:org", "permission.org:module_doc"], "namespace" => "Backend"], function () {



});

Route::prefix("doc")->group(function() {

    Route::group(["middleware" => "auth","prefix" => "member"],function (){
        //修改密码
        Route::match(["get","post"],"account",[
            "uses" => "MemberController@account"
        ])->name("member.account");
        //我的项目列表
        Route::get("projects",[
            "as" => "member.projects", "uses" => "MemberController@projects"
        ]);
        //用户中心
        Route::match(["post","get"],"",[
            "uses" => "MemberController@index"
        ])->name("member.index");

        Route::post("upload",[
            "as" => "member.upload", "uses" => "MemberController@upload"
        ]);

    });


    Route::group(["middleware" => "auth","prefix" => "project"],function (){
        //创建项目
        Route::match(["get","post"],"create",[
            "uses" => "ProjectController@create"
        ])->name("project.create");

        //编辑项目
        Route::match(["get","post"],"edit/{id?}",[
            "uses" => "ProjectController@edit"
        ])->name("project.edit");
        //删除项目
        Route::match(["get","post"],"delete/{id}",[
            "uses" => "ProjectController@delete"
        ])->name("project.delete");
        //成员管理
        Route::get("members/{id}",[
            "as" => "project.members", "uses" => "ProjectController@members"
        ]);
        //添加或删除项目的用户
        Route::post("members/add/{id}",[
            "as" => "project.members.add", "uses" => "ProjectController@addMember"
        ]);
        //退出项目
        Route::post("quit/{id}",[
            "as" => "project.quit", "uses" => "ProjectController@quit"
        ]);
        //转让项目
        Route::post("transfer/{id}")->uses("ProjectController@transfer")->name("project.transfer");
    });

    Route::group(["middleware" => "auth","prefix" => "docs"],function (){
        //文档编辑首页
        Route::get("edit/{id}",[
            "as" => "document.index", "uses" => "DocumentController@index"
        ])->where("id", "[0-9]+");

        //编辑文档
        Route::get("content/{id}",[
            "as" => "document.edit" , "uses" => "DocumentController@getContent"
        ])->where("id", "[0-9]+");
        //保存文档
        Route::post("save",[
            "as" => "document.save", "uses" => "DocumentController@save"
        ]);
        //删除文档
        Route::post("delete/{id}",[
            "as" => "document.delete", "uses" => "DocumentController@delete"
        ])->where("id", "[0-9]+");

        Route::post("sort/{id}",[
            "as" => "document.sort", "uses" => "DocumentController@sort"
        ])->where("id", "[0-9]+");

        //查看文档记录
        Route::match(["get","post"],"history/{id}",[
            "uses" => "DocumentController@history"
        ])->where("id", "[0-9]+")->name("document.history");

        //删除文档记录
        Route::post("history/delete",[
            "uses" => "DocumentController@deleteHistory"
        ])->name("document.history.delete");

        //恢复文档版本
        Route::post("history/restore",[
            "uses" => "DocumentController@restoreHistory"
        ])->name("document.history.restore");
    });
});
