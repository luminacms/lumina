<?php


namespace Modules\Core\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Core\Http\Resources\NotificationResource;

class NotificationController extends BaseController
{
    public function index()
    {
        if($this->request->expectsJson()){
            $page = request('page', 1);
            $limit = request('limit', 2);
            $type = $this->request->get('type', 'all');

            $model = $type=='all'?Auth::user()->notifications():Auth::user()->unreadNotifications();
            $paginate = [
                'total' => $model->count(),
                'current_page' => intval($page),
                'last_page' => ceil($model->count()/$limit),
                'per_page' => intval($limit)
            ];

            return response()->json([
                'errcode' => 0,
                'data' => $model->offset(($page-1)*$limit)->limit($limit)->get(),
                'meta' => $paginate
            ]);
        }
        return view('core::notification');
    }
}