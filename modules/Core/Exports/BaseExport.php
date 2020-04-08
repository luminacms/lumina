<?php

namespace Modules\Core\Exports;

use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Events\BeforeWriting;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\RegistersEventListeners;

class BaseExport implements WithEvents, FromQuery, WithHeadings, WithMapping, ShouldAutoSize
{
    use RegistersEventListeners;

    public $ids;
    public $params;

    public function __construct(string $ids = '', array $params = [])
    {
        $this->ids = $ids === 'all'?null:explode(',', $ids);
        $this->params = $params;
    }

    public function headings(): array{}

    public function map($row): array{}

    public function query(){}

    public static function beforeExport(BeforeExport $event)
    {
        $uinfo = var_export(auth()->user()->only(['id', 'name', 'email', 'mobile']), true);
        Log::channel('exportlog')->info('before Export: '.get_called_class().';from:'.$uinfo);
    }

    public static function beforeWriting(BeforeWriting $event){}
    public static function beforeSheet(BeforeSheet $event){}
    public static function afterSheet(AfterSheet $event){}
}
