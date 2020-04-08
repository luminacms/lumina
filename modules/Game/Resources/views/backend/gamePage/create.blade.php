@extends('core::layouts.modal')

@section('content')
    <x-form :action="route('game.game-page.store')" method="post">
        @include('game::backend.gamePage.fields')
    </x-form>
@endsection
