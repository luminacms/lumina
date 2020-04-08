@extends('core::layouts.modal')

@section('content')
    <x-form :action="route('game.games.store')" method="post">
        @include('game::backend.games.fields')
    </x-form>
@endsection
