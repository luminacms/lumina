<?php

namespace Modules\Core\Http\Controllers\Interfaces;

use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Modules\Core\Http\Controllers\BaseController;
class CalendarController extends BaseController
{
    public function index()
    {
        $colorMap = ['F14BA9', 'F76964', 'FF8800', '616AFF','14C0FF','8F959E'];
        $data = [];
        for($i=1;$i<20;$i++) {
            $data[] = [
                'id' => Str::orderedUuid(),
                'groupId' => 'workorder',
                'title' =>  Str::random(15),
                'start' => now()->subDays(random_int(1, 30))->format('Y-m-d H:i:s'),
                'textColor' => '#fff',
                'backgroundColor' => '#'.Arr::random($colorMap)
            ];
        }
        for($i=1;$i<40;$i++) {
            $data[] = [
                'id' => Str::orderedUuid(),
                'groupId' => 'workorder',
                'title' =>  Str::random(15),
                'start' => now()->addDays(random_int(1, 30))->format('Y-m-d H:i:s'),
                'textColor' => '#fff',
                'backgroundColor' => '#'.Arr::random($colorMap)
            ];
        }
        for($i=1;$i<5;$i++) {
            $start = now()->subDays(random_int(1, 5));
            $data[] = [
                'id' => Str::orderedUuid(),
                'groupId' => 'workorder',
                'title' =>  Str::random(15),
                'start' => $start->format('Y-m-d H:i:s'),
                'end' => $start->addDays(random_int(1, 5))->format('Y-m-d H:i:s'),
                'textColor' => '#fff',
                'backgroundColor' => '#'.Arr::random($colorMap)
            ];
        }
        return $this->toResponse($data);
    }
}
