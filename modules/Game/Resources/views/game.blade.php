<?php $hasHtml = Illuminate\Support\Str::contains($game->content, '<!DOCTYPE html>');?>

@if(!$hasHtml)
    @include('game::_game.default')
@else
    @include('game::_game.blank')
@endif


