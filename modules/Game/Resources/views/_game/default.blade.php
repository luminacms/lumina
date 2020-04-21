@extends('game::layouts.game')

@section('title', $game->title )
@section('content')
    {!! $game->content !!}
@endsection
