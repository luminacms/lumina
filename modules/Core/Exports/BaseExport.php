<?php

namespace Modules\Core\Exports;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
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

    public $ids = null;
    public $params;
    public $request;

    public function __construct(object $request, array $params = [])
    {
        $_ids = $request->get('ids');

        $this->request = $request;
        $this->ids = $_ids === 'all' ? null : explode(',', $_ids);
        $this->params = $params;
    }

    public function headings(): array{}

    public function map($row): array{}

    public function query(){}

    public static function beforeExport(BeforeExport $event){}
    public static function beforeWriting(BeforeWriting $event){}
    public static function beforeSheet(BeforeSheet $event){}
    public static function afterSheet(AfterSheet $event){
        Log::channel('exportlog')->info('', [
            'Export:' => get_called_class(),
            'user' => Auth::user()->userid
        ]);
    }
}
