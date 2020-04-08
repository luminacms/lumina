<?php

namespace Modules\Game\Console;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;

class StubCommand extends Command
{
    protected $stub;
    protected $filesystem;

    /**
     * StubCommand constructor.
     */
    public function __construct()
    {
        $this->filesystem = new Filesystem;
        parent::__construct();
    }

    /**
     * @return bool|string
     * @throws \Exception
     */
    protected function getStub()
    {
        if(!$this->filesystem->exists($this->stub)) {
            throw new \Exception('stub file not exist!');
        }
        $contents = file_get_contents($this->stub);
        foreach ($this->getReplacements() as $search => $replace) {
            $contents = str_replace('$' . strtoupper($search) . '$', $replace, $contents);
        }

        return $contents;
    }

    /**
     * @return array
     */
    public function getReplacements()
    {
        return [
            'bootstrap' => 'require_once base_path()."/bootstrap/game.php"'
        ];
    }
}
