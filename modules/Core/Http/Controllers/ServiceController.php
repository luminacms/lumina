<?php
namespace Modules\Core\Http\Controllers;

use Endroid\QrCode\QrCode;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Filesystem\Filesystem;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use Endroid\QrCode\Response\QrCodeResponse;
use Modules\Core\Http\Controllers\Interfaces\UploadController;

class ServiceController extends BaseController
{
    /**
     * 二维码服务
     *
     * @param Request $request
     * @return void
     */
    public function qrcode(Request $request)
    {
        $request->validate(['key' => 'required']);

        $qrCode = new QrCode($request->get('key'));
        $qrCode->setSize($request->get('w', 350));

        header('Content-Type: '.$qrCode->getContentType());
        return $qrCode->writeString();
    }


    /**
     * Undocumented function
     *
     * @param Request $request
     * @return void
     * // $option = [
     *       [
    *          'type' => 'img',
    *          'value' => 'https://static-legacy.dingtalk.com/media/lADPBbCc1ePTjqvNAtjNAu4_750_728.jpg',
    **          'resize' => '164,164',
    *          'position' => '327,328'
    *      ],
    *      [
    *          'type' => 'img',
    *          'value' => 'https://cdn.sxmgcm.cn/2019/01/xnzxs/pic.png'
    *      ],
    *      [
    *          'type' => 'text',
    *          'value' => 'jory',
    *          'position' => '375, 438'
    *      ]
    *  ];
     */
    public function imgMix(Request $request)
    {
        try{

            $request->validate(['size' => 'required', 'option' => 'required|json']);

            $option = json_decode($request->get('option'), true);
            $res = Image::canvas($request->get('width', 750), $request->get('height', 1336));
            foreach($option as $_opt) {
                $_pos = explode(',', $_opt['position']??'0,0');

                switch($_opt['type']){
                    case 'img':
                        $_img = Image::make($_opt['value']);
                        if(isset($_opt['resize'])) {
                            $__size = explode(',', $_opt['resize']);
                            $_img->resize($__size[0], $__size[1] ?? $__size[0]);
                        }
                        $res->insert($_img,'top-left', ($_pos[0] ?? 0), ($_pos[1] ?? 0));
                    break;
                    case 'text':
                        $res->text(str_clearEmoji($_opt['value']), $_pos[0] ?? 0, $_pos[1] ?? 0, function($font) {
                            $font->file(public_path('assets/fonts/SourceHanSansSC-Normal.ttf'));
                            $font->size(24);
                            $font->color('#ffffff');
                            $font->align('center');
                            $font->valign('top');
                        });
                    break;
                }
            }

            $file = new Filesystem();

            $now = now();
            $gamepath = 'games';
            $yearPath = $gamepath.'/'.now()->year;
            $monthPath = $yearPath . '/' . $now->month;

            if(!$file->isDirectory(storage_path($gamepath))) $file->makeDirectory(storage_path($gamepath));
            if(!$file->isDirectory(storage_path($yearPath))) $file->makeDirectory(storage_path($yearPath));
            if(!$file->isDirectory(storage_path($monthPath))) $file->makeDirectory(storage_path($monthPath));

            $path = $monthPath.'/'.Str::random(16).'.webp';
            $res->save(Storage::path($path), 75, 'webp');

            return $this->toResponse(['src' => url(Storage::url($path))]);
        }catch(\Exception $e){
            return $this->toException($e);
        }
    }
}
