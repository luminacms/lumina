<?php declare(strict_types=1);

use Modules\Core\Models\Option;

require __DIR__.'/avatar.php';

if (! function_exists('option')) {
    /**
     * Get / set the specified option value.
     *
     * If an array is passed as the key, we will assume you want to set an array of values.
     *
     * @param  array|string  $key
     * @param  mixed  $default
     * @return mixed|\Appstract\Options\Option
     */
    function option($key = null, $default = null)
    {
        if (is_null($key)) {
            return new Option();
        }

        if (is_array($key)) {
            return (new Option())->set($key);
        }
        $_val = (new Option())->get($key);

        return $_val;
    }
}

if (! function_exists('option_exists')) {
    /**
     * Check the specified option exits.
     *
     * @param  string  $key
     * @return mixed
     */
    function option_exists($key)
    {
        return (new Option())->exists($key);
    }
}

if (! function_exists('format_money')) {
    function format_money(int $money, int $len = 2, string $sign = ''): string
    {
        // 非数字类型返回
        if(!is_numeric($money)) {
            return $money.'';
        }
        $negative = $money != abs($money) ? '-' : '';
        $int_money = intval(abs($money));
        $len = intval(abs($len));
        $decimal = '';//小数
        if ($len > 0) {
            $decimal = '.' . substr(sprintf('%01.' . $len . 'f', $money), -$len);
        }
        $tmp_money = strrev($int_money);
        $strlen = strlen($tmp_money);
        $format_money = '';
        for ($i = 3; $i < $strlen; $i += 3) {
            $format_money .= substr($tmp_money, 0, 3) . ',';
            $tmp_money = substr($tmp_money, 3);
        }
        $format_money .= $tmp_money;
        $format_money = strrev($format_money);
        return $sign . $negative . $format_money . $decimal;
    }
}

if (! function_exists('to_fullurl')) {
    function to_fullurl($arrStr, $split = ',')
    {
        $_res = [];
        foreach (explode($split, $arrStr) as $k=>$_img) {
            $_res[$k] = url($_img);
        }
        return $_res;
    }
}

if (! function_exists('array_to_info')) {
    /**
     * 数组转换键值对
     */
    function array_to_info(array $array, string $type = '')
    {
        $_str = '';
        foreach($array as $k => $val) {
            $val = !is_array($val)?$val:array_to_info($val);
            if($type == 'table') {
                $_str .= '<tr><td width="100">'.$k.'</td><td>'.$val.'</td></tr>';
            }else if($type == 'dd'){
                $_str .= '<dd>'.$k.'：'.$val.'</dd>';
            }else{
                $_str .= $k.'：'.$val.';';
            }
        }
        return $_str;
    }
}


if(!function_exists('markdown_converter')) {
    /**
     * 解析 markdown 字符串
     * @param $text
     * @return string
     */
    function markdown_converter($text){
        $environment = League\CommonMark\Environment::createCommonMarkEnvironment();

        // 表格扩展
        $environment->addExtension(new League\CommonMark\Ext\Table\TableExtension());
//        $environment->addExtension(new Webuni\CommonMark\TableExtension\TableExtension());
//        $environment->addExtension(new Webuni\CommonMark\AttributesExtension\AttributesExtension());

//        $environment->addInlineParser(new AutoLinkParser());

//        $environment->addBlockRenderer('League\CommonMark\Block\Element\Heading',new Modules\Doc\Extentions\Markdown\Renderer\HeadingRenderer());
//        $environment->addBlockRenderer('League\CommonMark\Block\Element\Document',new Modules\Doc\Extentions\Markdown\Renderer\TocRenderer());

        // http格式化
        $environment->addBlockParser(new Modules\Doc\Extentions\Markdown\Parser\HttpMethodParser());
        $environment->addBlockRenderer('Modules\Doc\Extentions\Markdown\Element\HttpMethodBlock', new Modules\Doc\Extentions\Markdown\Renderer\HttpMethodRenderer());

        // 代码高亮
        $environment->addBlockRenderer(League\CommonMark\Block\Element\FencedCode::class, new Spatie\CommonMarkHighlighter\FencedCodeRenderer());
        $environment->addBlockRenderer(League\CommonMark\Block\Element\IndentedCode::class, new Spatie\CommonMarkHighlighter\IndentedCodeRenderer());

        $converter = new League\CommonMark\CommonMarkConverter([], $environment);

        $html = $converter->convertToHtml($text);

        return $html;
    }
}

if (! function_exists('number_format_money')) {
    function number_format_money($money, $len = 2, $sign = '')
    {
        // 非数字类型返回
        if(!is_numeric($money)) {
            return $money;
        }
        $negative = $money != abs($money) ? '-' : '';
        $int_money = intval(abs($money));
        $len = intval(abs($len));
        $decimal = '';//小数
        if ($len > 0) {
            $decimal = '.' . substr(sprintf('%01.' . $len . 'f', $money), -$len);
        }
        $tmp_money = strrev($int_money);
        $strlen = strlen($tmp_money);
        $format_money = '';
        for ($i = 3; $i < $strlen; $i += 3) {
            $format_money .= substr($tmp_money, 0, 3) . ',';
            $tmp_money = substr($tmp_money, 3);
        }
        $format_money .= $tmp_money;
        $format_money = strrev($format_money);
        return $sign . $negative . $format_money . $decimal;
    }
}

if (! function_exists('str_clearEmoji')) {
    function str_clearEmoji($text)
    {
        $clean_text = "";
        $regexEmoticons = '/[\x{1F600}-\x{1F64F}]/u';
        $clean_text = preg_replace($regexEmoticons, '', $text);
        $regexSymbols = '/[\x{1F300}-\x{1F5FF}]/u';
        $clean_text = preg_replace($regexSymbols, '', $clean_text);
        $regexTransport = '/[\x{1F680}-\x{1F6FF}]/u';
        $clean_text = preg_replace($regexTransport, '', $clean_text);
        $regexMisc = '/[\x{2600}-\x{26FF}]/u';
        $clean_text = preg_replace($regexMisc, '', $clean_text);
        $regexDingbats = '/[\x{2700}-\x{27BF}]/u';
        $clean_text = preg_replace($regexDingbats, '', $clean_text);
        return $clean_text;
    }
}
