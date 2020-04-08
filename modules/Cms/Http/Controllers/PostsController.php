<?php


namespace Modules\Cms\Http\Controllers;


use Illuminate\Http\Request;
use Modules\Cms\Models\Post;
use Modules\Core\Http\Controllers\BaseController;

class PostsController extends BaseController
{

    /**
     * @param Post $post
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function detail(Post $post, Request $request)
    {
        $post->addCount();
        return view('cms::themes.default.detail', compact('post'));
    }

}