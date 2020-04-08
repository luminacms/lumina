<?php
/**
 * Created by PhpStorm.
 * User: lifeilin
 * Date: 2017/1/6 0006
 * Time: 10:58
 */

namespace Modules\Doc\Extentions\Markdown\Parser;

use League\CommonMark\Block\Parser\BlockParserInterface;
use League\CommonMark\ContextInterface;
use League\CommonMark\Cursor;
use League\CommonMark\Inline\Element\Link;
use League\CommonMark\Inline\Parser\AbstractInlineParser;
use League\CommonMark\InlineParserContext;
use League\CommonMark\Util\UrlEncoder;

class AutoLinkParser implements BlockParserInterface
{
    public function getCharacters()
    {
        return ['<'];
    }

    public function parse(ContextInterface $context, Cursor $cursor): bool
    {
        $inlineContext = new InlineParserContext();
        $cursor = $inlineContext->getCursor();

        var_dump($cursor->getLine());exit;

        if ($m = $cursor->match('/[a-zA-z]+://[^\s]*/')) {


            $dest = substr($m, 1, -1);
            $inlineContext->getContainer()->appendChild(new Link(UrlEncoder::unescapeAndEncode($dest), $dest));

            return true;
        }
        return false;
    }

}