<?php

namespace Modules\Game\Console;

use App\Exceptions\GameFileExist;
use Symfony\Component\Console\Input\InputOption;

class GameStubMaker extends StubCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'biu:make-game {name} {--title=}';
    protected $stub = __DIR__.'/stub/game.stub';
    protected $gamePath = '';
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'game generate';

    /**
     * @return int
     * @throws GameFileExist
     */
    public function handle()
    {
        $now = \Carbon\Carbon::now();

        $_yearPath = storage_path(config('game.game_path')).'/'.$now->year;
        $_filePath = $_yearPath.'/'.$now->month.'/'.$this->argument('name');
        $this->gamePath = $_filePath;

        if(!$this->filesystem->isDirectory($_filePath)) {
            $this->filesystem->makeDirectory($_filePath,0777, true, true);
            // 复制素材
//        $asset_path = resource_path().'/assets/game';
//        $this->filesystem->copy($asset_path.'/thumb.jpg', $_filePath.'/thumb.jpg');
//        $this->filesystem->copy($asset_path.'/share.jpg', $_filePath.'/share.jpg');

            return $this->filesystem->put($_filePath . '/index.blade.php', $this->getStub());
        }
    }

    /**
     * @return array
     */
    public function getReplacements()
    {
        return array_merge(parent::getReplacements(), [
            'title' => $this->option('title') ?? '游戏主题'
        ]);
    }

    protected function getOptions()
    {
        return [
            [
                'title',
                null,
                InputOption::VALUE_OPTIONAL,
                'game file title.',
                null
            ],
        ];
    }
}
