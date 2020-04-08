@extends('vote::backend.layouts.master')

@section('content')
    <x-card>
        <x-form :action="route('backend.vote.votes.update', $vote->id)" method="patch">
            @include('vote::backend.votes.fields')
        </x-form>
    </x-card>
@endsection
