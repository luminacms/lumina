<?php

namespace Modules\Core\Http\Controllers\Interfaces;

use Illuminate\Filesystem\Filesystem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Core\Models\File;

class UploadController extends BaseController
{
    protected $upload_path;

    protected $disk;
    protected $model;
    protected $filesystem;
    protected $storage;

    public function __construct(File $file, Filesystem $filesystem)
    {
        $this->model = $file;
        $this->filesystem = $filesystem;
    }

    /**
     * file upload
     *
     * @param Request $request
     * @param File $model
     * @return void
     */
    public function upload(Request $request)
    {
        // 网络抓取托管
        if($request->get('type') == 'fetch') {
            return $this->_handleFetch($request);
        }

        $request->validate(['option' => 'array']);
        $now = now();

        $file = $request->file('file');
        $option = array_merge([
            // 上传路径
            'path' => 'uploads/'.$now->year.'/'.$now->month,
            // 文件后缀
            'ext' => $request->get('ext', $file->getClientOriginalExtension()),
            // 是否保留原文件名
            'keepname' => false,
            // 是否返回完整地址
            'fullurl' => false
        ], $request->get('option', []));

        if (!$file->isValid()) {
            return $this->toError(-1, '文件格式错误');
        }

        $md5 = md5_file($file);
        if(!$res = $this->model->where('md5', $md5)->first()) {
            $filepath = !$option['keepname']
                    ? $file->store($option['path'])
                    : $file->storeAs($option['path'], $file->getClientOriginalName(). '.' .$option['ext']);

            $data = [
                'md5' => $md5,
                'path' => $filepath,
                'disk' => config('filesystems.default'),
                'size' => $file->getSize(),
                'ext' => $option['ext'],
                'oid' => auth()->guard('org')->oid() ?? 1,
                'create_by' => Auth::guest() ? 0 : Auth::user()->id
            ];
            $res = $this->model->create($data);
        }

        $url = Storage::url($res['path']);
        return $this->toResponse(array_merge([
            'url' => $option['fullurl'] ? asset($url) : $url
        ], $res->only(['size', 'ext'])));
    }


    /**
     * fetch img from netwrork
     *
     * @param [type] $request
     * @return void
     */
    public function _handleFetch($request)
    {
        $request->validate(['url' => 'required']);

        $url = $request->get('url');
        $fullurl = $request->get('fullurl');
        try{
            $ext = $this->filesystem->extension($url);

            if(!in_array($ext, ['jpg', 'png', 'gif', 'jpeg'])) {
                return $this->toError(-1, '抓取失败，目前仅支持jpg, png, gif, jpeg格式图片！'.$ext);
            }

            $md5 = md5($url);
            if(!$res = $this->model->where('md5', $md5)->first()) {
                $now = now();
                $path = 'fetch/'.$now->year.'/'.$now->month.'/'.Str::random(40).'.'.$ext;
                $result = Storage::put($path, Http::get($url)->body());

                if($result) {
                    $res = $this->model->create([
                        'md5' => $md5,
                        'path' => $path,
                        'disk' => config('filesystems.default'),
                        'size' => Storage::size($path),
                        'ext' => $ext,
                        'oid' => auth()->guard('org')->oid() ?? 1,
                        'create_by' => Auth::guest() ? 0 : Auth::user()->id
                    ]);
                }
            }

            $url = Storage::url($res['path']);
            return $this->toResponse(array_merge([
                'url' => $fullurl ? asset($url) : $url
            ], $res->only(['size', 'ext'])));
        }catch (\Exception $e){
            return $this->toException($e);
        }
    }


    /**
     * @param $src
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function preview(Request $request)
    {
        $request->validate(['src'=>'required']);
        return redirect('https://view.officeapps.live.com/op/view.aspx?src='.url($request->get('src')));
    }

    /**
     * @param $src
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function download(Request $request)
    {
        $request->validate(['src'=>'required']);
        return response()->download(public_path($request->get('src')));
    }
}
