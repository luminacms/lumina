@extends('core::layouts.modal')

@section('content')
    <x-form :action="route('game.game-page.update', $gamePage->id)" method="patch">
        @include('game::backend.gamePage.fields')
    </x-form>
@endsection
