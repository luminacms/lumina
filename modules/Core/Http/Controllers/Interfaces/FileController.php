<?php

namespace Modules\Core\Http\Controllers\Interfaces;

use Illuminate\Http\Request;
use Illuminate\Filesystem\Filesystem;
use Spatie\ResponseCache\Facades\ResponseCache;
use Modules\Core\Http\Controllers\BaseController;

class FileController extends BaseController
{
    public $gamePath;
    public $expectDir = ['vendor', 'node_modules'];

    /**
     * FileController constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $_type = $request->get('type', 'doc');
        $_path = $request->get('path');
        switch ($_type){
            case 'webide':
                if(!$_path) abort(404, '参数错误');
                $this->gamePath = $_path;
                break;
            case 'doc':
            default:
                $this->gamePath = module_path('Core').'/Docs';
                break;
        }
    }

    /**
     * @param Request $request
     * @return array|\Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $fileObj = new Filesystem();
        if(!$fileObj->isDirectory(storage_path($this->gamePath))) {
            return $this->toError(-1, 'H5目录不存在！');
        }
        return [
            'id' => '\\'.$this->gamePath,
            'text' => pathinfo($this->gamePath)['basename'] ?? 'ROOT',
            'depath' => 0,
            'state' => ['opened' => true],
            'icon' => 'folder',
            'children' => $this->getAllFiles($this->gamePath, $this->gamePath)
        ];
    }

    /**
     * @param $_gamePath
     * @param $path
     * @param int $depath
     * @return array
     */
    protected function getAllFiles($_gamePath, $path, $depath = 1)
    {
        $files = [];
        $fileObj = new Filesystem();
        $relativePath = storage_path();

        foreach($fileObj->directories(storage_path($path)) as $_path) {
            if(in_array(basename($_path), $this->expectDir)){
                continue;
            };

            $_local_relative = str_replace($relativePath, '', $_path);
            $files[] =  [
                'id' => $_local_relative,
                'text' => basename($_path),
                'depath' => $depath,
                'icon' => 'folder',
                'children' => $this->getAllFiles($_gamePath, $_local_relative, $depath + 1)
            ];
        }

        foreach($fileObj->files(storage_path($path)) as $_file) {
            $files[] = [
                'id' => str_replace($relativePath, '',  $_file->getPathname()),
                'text' => basename($_file),
                'depath' => $depath,
                'type' => 'file',
                'icon' => 'file file-'.$_file->getExtension(),
                'ext' => $_file->getExtension()
            ];
        }

        return $files;
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function get(Request $request)
    {
        $request->validate(['id' =>'required']);

        $path =  $request->get('id');
        try{
            $fileObj = new Filesystem();

            $_file = storage_path($path);
            if(!$fileObj->isFile($_file)){
                return $this->toError(-1, '文件不存在');
            }
            $_ext = $fileObj->extension($_file);
            $_data = ['type' => $_ext, 'content' => ''];
            switch($_ext) {
                case 'txt':
                case 'text':
                case 'md':
                case 'js':
                case 'json':
                case 'css':
                case 'html':
                case 'htm':
                case 'xml':
                case 'c':
                case 'cpp':
                case 'h':
                case 'sql':
                case 'log':
                case 'py':
                case 'rb':
                case 'htaccess':
                case 'php':
                $_data['content'] = $fileObj->get($_file);
                    break;
                case 'jpg':
                case 'jpeg':
                case 'gif':
                case 'png':
                case 'bmp':
                    $_data['content'] = 'data:'.finfo_file(finfo_open(FILEINFO_MIME_TYPE), $_file).';base64,'.base64_encode($fileObj->get($_file));
                    break;
                default:
                    $_data['content'] = 'File not recognized: '.$_file;
                    break;
            }
            return $this->toResponse($_data);
        }catch (\Exception $e) {
            return $this->toException($e);
        }
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'text' => 'required',
            'type' => 'required'
        ]);
        $id = $request->get('id');
        $type = $request->get('type');
        $text = $request->get('text');
        $fileObj = new Filesystem();

        $_filepath = $id.DIRECTORY_SEPARATOR.$text;
        $_filepath = str_replace('\\', DIRECTORY_SEPARATOR,  $_filepath);
        try{
            $target = storage_path($_filepath);

            if($fileObj->exists($target)) {
                return $this->toError(-1, '目标已存在');
            };
            if($type == 'default') {
                if($fileObj->makeDirectory($target)) {
                    return $this->toResponse(['id' => $_filepath], '目录创建成功');
                }
            }else if($type == 'file') {
                $fileObj->put($target, '');
                return $this->toResponse(['id' => $_filepath], '文件创建成功');
            }
        }catch (\Exception $e) {
            return $this->toException($e);
        }
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try{
            $request->validate([
                'id' => 'required',
                'data' => 'required'
            ]);
            $data = $request->get('data');
            $path = $request->get('id');

            $fileObj = new Filesystem();
            $fullPath = storage_path($path);
            if(!$fileObj->isFile($fullPath)) {
                return $this->toError(-1, '文件不存在或者权限不够');
            }

            $fileObj->put($fullPath, $data);

            ResponseCache::clear();
            return $this->toResponse([], '保存成功');
        }catch (\Exception $e) {
            return $this->toException($e);
        }
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(Request $request)
    {
        try{
            $request->validate([
                'id' => 'required'
            ]);

            $path = $request->get('id');

            $fileObj = new Filesystem();
            $fullPath = storage_path($path);
            if(!$fileObj->exists($fullPath)) {
                return $this->toError(-1, '删除目标不存在');
            }

            if($fileObj->isDirectory($fullPath)) {
                if(!$fileObj->files($fullPath)){
                    $fileObj->deleteDirectory($fullPath);
                }else{
                    return $this->toError(-1, '目录有文件禁止删除!');
                }
            }else{
                $fileObj->delete($fullPath);
            }

            ResponseCache::clear();
            return $this->toResponse([], '删除成功');
        }catch (\Exception $e) {
            return $this->toException($e);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function rename(Request $request)
    {
        try{
            $request->validate([
                'id' => 'required',
                'text' => 'required'
            ]);

            $path = $request->get('id');
            $text = $request->get('text');

            $fileObj = new Filesystem();
            $fullPath = storage_path($path);

            $_newFileName = $fileObj->dirname($path).'/'.$text;

            if($fileObj->exists($_newFileName)){
                return $this->toError(-1, '目标已存在');
            }

            if(!$fileObj->isDirectory($fullPath)) {
                $fileObj->move($fullPath, storage_path($_newFileName));
            }else{
                $fileObj->moveDirectory($fullPath,storage_path($_newFileName));
            }

            ResponseCache::clear();
            return $this->toResponse(['id' => $_newFileName], '重命名成功');
        }catch (\Exception $e) {
            return $this->toException($e);
        }
    }
}
