<?php


namespace Modules\Core\Http\Controllers\Interfaces;


use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Core\Http\Resources\NotificationResource;

class NotificationController extends BaseController
{

    /**
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        $msg = ($request->get('type')=='all')?$user->notifiations:$user->unreadNotifications;
        return $this->toCollection($msg, NotificationResource::class);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function count()
    {
        $user = auth()->user();
        return $this->toResponse(['count' => $user->unreadNotifications()->count()]);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function markread()
    {
        $this->request->validate(['ids' => 'required']);

        $user = auth()->user();
        $notices = $user->unreadNotifications()->whereIn(
            'id', $this->request->get('ids')
        )->update(['read_at' => now()]);
        return $this->toResponse(['count' =>$notices], '消息标记成功');
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete()
    {
        $this->request->validate(['ids' => 'required']);

        $user = auth()->user();
        $notices = $user->unreadNotifications()->whereIn(
            'id', $this->request->get('ids')
        )->delete();
        return $this->toResponse(['count' =>$notices], '消息删除成功');

    }

}