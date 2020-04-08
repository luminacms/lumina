<?php
namespace Modules\Core\Utils;

class Avatar
{
    public static function create($name, $size = 100, $radius = true)
    {
        return self::createBase64($name, $size, $radius);
    }

    public static function createBase64($name, $size = 64, $radius = true)
    {
        ob_start();
        header("Content-type: image/png;charset=utf-8");

        $image = imagecreate($size, $size);
        $white = imagecolorallocate($image, 172, 180, 188);
        $red = imagecolorallocate($image, 255, 255, 255);
        $font = public_path('fonts/wryh.ttf');
        $name = mb_substr($name, -2, 2);
        imagettftext($image, $size/3, 0, $size/10, $size*0.6, $red, $font, $name);

        imagepng($image);
        $image_data = ob_get_contents();
        ob_end_clean();

        return "<img src='data:image/png;base64," . base64_encode($image_data)."' width='".$size."' height=''.$size.''>";
    }
}