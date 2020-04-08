@extends('core::layouts.modal')

@section('content')
    <x-form :action="route('game.games.update', $game->id)" :method="patch">
        @include('game::backend.games.fields')
    </x-form>
@endsection
