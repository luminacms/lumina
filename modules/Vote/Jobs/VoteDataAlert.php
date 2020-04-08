<?php

namespace Modules\Vote\Jobs;

use Carbon\Carbon;
use GuzzleHttp\Client;
use Modules\Core\Jobs\BaseJob;
use Modules\Vote\Models\Vote;
use Modules\Vote\Models\VoteData;

class VoteDataAlert extends BaseJob
{
    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $underWayVotes = Vote::underway()->where([
            ['notice_webhook', '<>', ''],
            ['notice_interval', '<>', '']
        ])->get();

        foreach ($underWayVotes as $_vote) {
            if(now()->gte(Carbon::parse($_vote->last_noticed_at)->addHour($_vote->notice_interval))) {
                // 当前时间大于等于最后一次通知时间+时间间隔
                $this->_sendMsg($_vote->id);
            }
        }
    }

    /**
     * @param $vote_id
     */
    protected function _sendMsg($vote_id)
    {
        $vote = Vote::find($vote_id);
        if($vote && $vote["notice_webhook"] && $vote["notice_interval"]) {
            $text = "【".$vote->title."】\n";

            $voteData = VoteData::where("created_at",">",$vote["last_noticed_at"]??0)->orderBy("created_at", "desc")->get();
            $_start = $vote["last_noticed_at"]??"开始";

            if($voteData->count() > 0) {
                $text .= "从".$_start."到".now()."截至报名数据如下：\n";
                if($voteData->count() > 100){
                    $voteData = $voteData->take(100);
                    $text .= "> 数据超过100条，只显示最新100条!";
                }

                $text .="\n\n";
                foreach ($voteData as $_data) {
                    $text .= "- ".$_data["name"]."[[".$_data["mobile"]."](tel:".$_data["mobile"].")]\n";
                }
            }else{
                $text .= "从".$_start."到".now()."暂无报名数据0.0：\n";
            }
            $text .= "\n\n > **完整数据请[点我跳转](https://www.baidu.com)**";
            $data = [
                'msgtype' => 'markdown',
                'markdown' => [
                    "title" => "【报名】上一时间段的报名数据",
                    "text" => $text
                ],
                'at' => []
            ];

            $client = new Client();
            $response = $client->request('POST', $vote->notice_webhook, [
                'json' => $data
            ]);
            $reponse =  $response->getBody()->getContents();
            $res = json_decode($reponse, true);

            if($res['errcode'] == 0){
                $vote->update(['last_noticed_at' => now()]);
            }
        }
    }
}
