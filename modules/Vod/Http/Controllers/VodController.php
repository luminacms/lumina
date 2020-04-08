<?php


namespace Modules\Vod\Http\Controllers;


use Illuminate\Filesystem\Filesystem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Vod\Models\VodOrder;

class VodController extends BaseController
{

    /**
     * @param $code
     * @param Filesystem $filesystem
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function media($code, Filesystem $filesystem)
    {
        $url = decrypt($code);
        $url = str_replace('/storage', '', $url);
        $storage = Storage::disk('public');
        $mp4 = $storage->path($url);
        return response()->file($mp4, [
            'Content-Type' => $filesystem->mimeType($mp4),
            'Content-Disposition' => 'inline; filename="Lesson-file"'
         ]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse|void
     */
    public function makeorder(Request $request)
    {
        try{
            $request->validate([
                'type' => 'required',
                'id' => 'required'
            ]);
            return VodOrder::makeOrder($request->get('type'), $request->get('id'));
        }catch (\Exception $e){
            return $this->toException($e);
        }
    }
}