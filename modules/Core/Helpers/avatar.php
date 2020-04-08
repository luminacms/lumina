<?php declare(strict_types=1);

if (! function_exists('avatar_string')) {
    function avatar_string(string $name)
    {
        ob_start();
        header("Content-type: image/png;charset=utf-8");

        $image = imagecreate(100, 100);
        $white = imagecolorallocate($image, 172, 180, 188);
        $red = imagecolorallocate($image, 255, 255, 255);
        $font = public_path('assets/fonts/wryh.ttf');
        $name = mb_substr($name, -2, 2);
        imagettftext($image, 28, 0, 14, 65, $red, $font, $name);

        imagepng($image);
        $image_data = ob_get_contents();
        ob_end_clean();

        return "data:image/png;base64," . base64_encode($image_data);
    }
}

if (! function_exists('avatar_img')) {
    function avatar_img(string $name)
    {
        // Hash generation taken from https://en.gravatar.com/site/implement/images/php/
        $hash = md5(strtolower(trim($name)));
        $attributes = [];
//        if ($this->width) {
//            $attributes['s'] = $this->width;
//        }
        if (!empty($param)) {
            $attributes = $param + $attributes;
        }
        $url = sprintf('https://www.gravatar.com/avatar/%s', $hash);
        if (!empty($attributes)) {
            $url .= '?';
            ksort($attributes);
            foreach ($attributes as $key => $value) {
                $url .= "$key=$value&";
            }
            $url = substr($url, 0, -1);
        }
        return $url;
    }
}
