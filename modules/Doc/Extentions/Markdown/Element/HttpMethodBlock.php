<?php
/**
 * Created by PhpStorm.
 * User: lifeilin
 * Date: 2017/1/6 0006
 * Time: 10:28
 */

namespace Modules\Doc\Extentions\Markdown\Element;

use League\CommonMark\Block\Element\AbstractBlock;
use League\CommonMark\Block\Element\AbstractStringContainerBlock;
use League\CommonMark\Block\Element\InlineContainerInterface;
use League\CommonMark\ContextInterface;
use League\CommonMark\Cursor;

class HttpMethodBlock extends AbstractStringContainerBlock implements InlineContainerInterface
{
    private $method;
    private $link;

    public function __construct($method, $contents)
    {
        parent::__construct();

        $this->method = $method;
        $this->link = $contents;

        if (!is_array($contents)) {
            $contents = [$contents];
        }

        foreach ($contents as $line) {
            $this->addLine($line);
        }
    }


    public function getMethod()
    {
        return $this->method;
    }
    public function getLink()
    {
        return $this->link;
    }

    public function finalize(ContextInterface $context, $endLineNumber)
    {
        parent::finalize($context, $endLineNumber);
        $this->finalStringContents = implode("\n", $this->strings->toArray());
    }
    /**
     * Returns true if this block can contain the given block as a child node
     *
     * @param AbstractBlock $block
     *
     * @return bool
     */
    public function canContain(AbstractBlock $block): bool
    {
        return false;
    }

    /**
     * Returns true if block type can accept lines of text
     *
     * @return bool
     */
    public function acceptsLines()
    {
        return true;
    }
    /**
     * Whether this is a code block
     *
     * @return bool
     */
    public function isCode(): bool
    {
        return false;
    }

    public function matchesNextLine(Cursor $cursor): bool
    {
        return false;
    }

    /**
     * @param ContextInterface $context
     * @param Cursor           $cursor
     */
    public function handleRemainingContents(ContextInterface $context, Cursor $cursor)
    {
        // nothing to do; we already added the contents.
    }
}