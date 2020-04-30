<?php
/**
 * Created by PhpStorm.
 * User: jory
 * Date: 2018/11/7
 * Time: 13:54
 */

namespace Modules\Wechat\Services;

use App\Models\Account;
use App\Utils\XUpload;
use EasyWeChat\Kernel\Contracts\EventHandlerInterface;
use EasyWeChat\Kernel\Messages\Image as ImageMessage;
use EasyWeChat\Kernel\Messages\Text;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use Modules\Wechat\Models\Reply;

class MessageHandler implements EventHandlerInterface
{
    protected $payload;

    public function handle($payload = null)
    {
        $this->payload = $payload;

        // 先把活动跑完
        if(str_contains($payload['Content'], '扎心事')) {
            return $this->handlePicReturn();
        }

        $account = Account::where('aid', request('aid'))->first();
        $reply = Reply::where([
            ['appid', $account['appid']],
            ['type', 'MATCH'],
            ['value', $payload['Content']],
        ])->first();

        if(!$reply) {
            $reply = Reply::where([
                ['appid', $account['appid']],
                ['type', 'LIKE'],
                ['value', 'like', '%'.$payload['Content'].'%'],
            ])->first();
        }

        if(!$reply) {
            return;
        }
        return new Text($reply->msgs->content);
    }


    /**
     * @param $mediaId
     * @param $format
     * @param string $recognition
     * @return Text
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \EasyWeChat\Kernel\Exceptions\RuntimeException
     */
    protected function handleVoice($mediaId, $format, $recognition = '')
    {
//        $stream = $this->wechat->media->get($mediaId);
//
//        if ($stream instanceof \EasyWeChat\Kernel\Http\StreamResponse) {
//            $now = now();
//
//            $_path = 'public/media/' . $now->year . '/' . $now->month . '/' . $now->day;
//            $fullPath = Storage::path($_path);
//            $fileName = $stream->save($fullPath);
//
//            $fullUrl = Storage::url($_path);
//            return new Text($recognition.'。链接：'.url($fullUrl.'/'.$fileName));
//        }
    }


    /**
     * @return ImageMessage|void
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    protected function handlePicReturn()
    {
        try{
            $payload = $this->payload;
            $itemsObj = [
                '瘦了2两，胖了10斤',
                '依旧没对象，依旧被逼婚',
                '花呗欠的太多，为了不还钱，卸载了支付宝',
                '5年前立得所有flag，今年还是没实现',
                '半夜被惊醒，舍友床塌了',
                '头秃的你，双十一只顾着抢植发水',
                '在无能为力的年纪遇到深爱的人',
                '你的团队刚刚搭建好，领导让你下课了…',
                '群里发红包，别人都是180，你总是抢2分钱',
                '去别人家拉完屎发现死活冲不下去',
                '虽然你长得丑，但你想得美',
                '王者荣耀对方就差一起残血，竟然还把你反杀了',
                '只要不洗头不收拾出门，一定会遇到前男友和他漂亮的现任',
                '你喜欢的人恰好不喜欢你',
                '眼瞅着6点就下班，5点59分的时候老板突然说：来，大家开个会',
                '等了120秒广告后才发现这集看过了',
                '没看书去考试，偏偏得了59分',
                '出门前手机充了一小时电，准备出门时，才发现插头没有插好',
                '虽然你单身，但是你胖若两人',
                '你喜欢了好久的人，正要表白，他跟别人在一起了',
                '你一直男去相亲，结果到了约会地点，对方竟然是个大老爷们',
                '你住城东Ta住城西，拒绝你的理由是不谈异地恋',
                '快过年了，餐厅都已关门，而你还在上班',
                '呼吸都会长胖',
                '偶遇前任，发现对方瘦了几十斤',
                '快过年了，工资还不够给亲戚的孩子们发红包',
                '去朋友家把姨妈巾掉人马桶里冲不下去，最后马桶堵了',
                '前任和前前任成了好朋友，最后都把你拉黑了',
                '想自己开车送暗恋对象回家，却发现没油了',
                '对不起，你拨打的用户已结婚',
                '和对象接吻，结果两个人的牙套勾在了一起',
                '路边靠停一分钟，就被贴条了',
                '没钱剪刘海，脖子都甩歪了',
                '拉屎完了拍照发给老公，老公刚好在吃饭，喷了同事一脸',
                '女神放你鸽子是因为跟别的男人去买600w的房子了',
                '刚补的牙，吃东西时嘎嘣一声掉地上被狗狗叼走了',
                '停电了刚爬上28楼，电梯就来电了…',
                '洗澡洗到一半，停水了',
                '起了个大早，到了公司发现不上班',
                '婚宴吃太多，皮带突然崩了',
                '讲了半小时笑话环顾四周，发现并没有人听',
                '变胖后，围上新买的红围巾，与QQ企鹅莫名相似',
                '刚买的粉饼手一滑就摔地上碎成了渣',
                '健身健到一半，裤裆扯了',
                '和同事在群里吐槽领导，结果发到了大群里',
                '洗澡忘了关门，被熊孩子拍抖音，火了',
                '发错信息，想点撤回却点了删除',
                '搬新家时家具刚进门就把崭新的墙壁磕了个洞',
                '公交上睡着了，醒来发现头发被人剪了',
                '正炒菜时烟囱掉到了锅里，吓得以为天降蟒蛇',
                '让男朋友买芦荟胶，结果男朋友寄来一盆芦荟',
                '火锅炖好了，吃一半，天花板掉个土块下来',
                '让男朋友买999，结果男朋友给买了皮炎平',
                '加班到凌晨三点，才想起来还没打下班卡',
                '熬通宵写完的方案，早上客户说不用了',
                '让男朋友买个红腰子，结果男朋友弄了个割下来的猪腰子',
            ];
            $client = new \GuzzleHttp\Client();

            $bg = $client->request('get','https://cdn.xaweiju.com/2019/01/xnzxs/pic.png')->getBody()->getContents();

            $wechat = WechatInit::officeAccount('8ccb2a91-cfb8-4134-9a28-c1cd0b727d63');
//            $user = $wechat->user->get('oNSeu0ZcPB_q5M2PaBbzsWFjJYrE');
            $user = $wechat->user->get($payload['FromUserName']);
            if(!isset($user['headimgurl']) || !isset($user['nickname'])) {
                return;
            }

            $img = Image::canvas(750, 1334);
            $img->insert($client->request('get',$user['headimgurl'])->getBody()->getContents(),'top-left','327','328');
            $img->insert($bg, 'top-left', '0', '0');

            $img->text(removeEmoji($user['nickname']), 375, 438, function($font) {
                $font->file(public_path('assets/fonts/SourceHanSansSC-Normal.ttf'));
                $font->size(24);
                $font->color('#ffffff');
                $font->align('center');
                $font->valign('top');
            });

            $yposition = 525;
            $xposition = 156;
            $items = array_random($itemsObj, 3);
            foreach($items as $item) {
                $yposition = $yposition + 20;

                $img->circle(6, $xposition-16, $yposition+10, function ($draw) {
                    $draw->background('#d21012');
                });

                $string = wordwrap_utf8($item, 16, "|");
                $strings = explode("|", $string);

                foreach ($strings as $_string) {
                    $img->text($_string, $xposition, $yposition, function ($font) {
                        $font->file(public_path('fonts/SourceHanSansSC-Normal.ttf'));
                        $font->size(26);
                        $font->color('#000000');
                        $font->align('left');
                        $font->valign('top');
                    });
                    $yposition = $yposition + 42;
                }

//        $img->line($xposition - 40, $yposition + 10, $xposition + 350, $yposition + 10, function ($draw) {
//            $draw->color('#b89e89');
//        });
            }

            $fileName = XUpload::getUploadPath(true).'/'.Str::random(40).'.jpg';
            $realPath = Storage::path($fileName);

            $img->save($realPath);
            $res = $wechat->media->uploadImage($realPath);

            return new ImageMessage($res['media_id']);
        }catch (\Exception $e){
            throw new \Exception($e);
        }
    }

}
