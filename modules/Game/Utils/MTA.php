<?php
// 腾讯MTA接口

namespace Modules\Game\Utils;


use GuzzleHttp\Client;
use Modules\Core\Traits\ResponseTrait;

class MTA
{
    use ResponseTrait;

    const MTA_HOST = 'https://mta.qq.com';

    protected $app_id;
    protected $secret_key;

    protected $client;

    /**
     * MTA constructor.
     */
    public function __construct()
    {
        $_conf = config('game.mta');

        $this->app_id = $_conf['app_id'];
        $this->secret_key = $_conf['secret_key'];

        $this->client = new Client();
    }

    /**
     * @param $params
     * @return array
     */
    private function __buildParams($params = [])
    {
        $_sk = $this->secret_key;
        $params = array_merge($params, ['app_id' => $this->app_id]);
        ksort($params);
        foreach ($params as $key => $value) {
            $_sk.= $key.'='.$value;
        }
        return array_merge($params, ['sign' => md5($_sk)]);
    }

    /**
     * 应用每天的pv\uv\vv\iv数据。
     * @param $start_date
     * @param $end_date
     * @param string $idx
     * @return mixed
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function ctrCoreData($start_date, $end_date, $idx = 'pv,uv,vv,iv')
    {
        $_api = self::MTA_HOST.'/h5/api/ctr_core_data';

        $res = $this->client->request('GET', $_api, [
            'query' => $this->__buildParams([
                'start_date' => $start_date,
                'end_date' => $end_date,
                'idx' => $idx
            ])
        ]);
        return json_decode($res->getBody()->getContents(), true);
    }

    /**
     * 当前访问数据
     * @return mixed
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function heartBeat()
    {
        $_api = self::MTA_HOST.'/h5/api/ctr_realtime/heartbeat';

        $res = $this->client->request('GET', $_api, [
            'query' => $this->__buildParams()
        ]);
        return json_decode($res->getBody()->getContents(), true);
    }

    /**
     * 全天小时数据
     * @param string $idx
     * @return mixed
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function ctrRealtime($idx = 'pv,uv,vv,iv')
    {
        $_api = self::MTA_HOST.'/h5/api/ctr_realtime/get_by_hour';

        $res = $this->client->request('GET', $_api, [
            'query' => $this->__buildParams([
                'idx' => $idx
            ])
        ]);
        return json_decode($res->getBody()->getContents(), true);
    }

    /**
     * 按天查询所有url的pv\uv\vv\iv数据
     * @param $start_date
     * @param $end_date
     * @param int $page
     * @param string $idx
     * @return mixed|\Psr\Http\Message\ResponseInterface
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function listAllPageOffline($start_date, $end_date, $page = 1, $idx = 'pv,uv,vv,iv')
    {
        $_api = self::MTA_HOST.'/h5/api/ctr_page/list_all_page_offline';

        $res = $this->client->request('GET', $_api, [
            'query' => $this->__buildParams([
                'start_date' => $start_date,
                'end_date' => $end_date,
                'page' => $page,
                'idx' => $idx
            ])
        ]);
        return json_decode($res->getBody()->getContents(), true);
    }

    /**
     * 查询的url可从页面排行-实时|离线列表查询相应的格式
     * @param $start_date
     * @param $end_date
     * @param $urls
     * @param string $idx
     * @return mixed
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function ctrPage($start_date, $end_date, $urls, $idx = 'pv,uv,vv,iv')
    {
        $_api = self::MTA_HOST.'/h5/api/ctr_page';

        $res = $this->client->request('GET', $_api, [
            'query' => $this->__buildParams([
                'start_date' => $start_date,
                'end_date' => $end_date,
                'urls' => $urls,
                'idx' => $idx
            ])
        ]);
        return json_decode($res->getBody()->getContents(), true);
    }

}