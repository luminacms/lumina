@extends('core::layouts.modal')

@section('content')
    <x-card>
        <x-form :action="route('point.point.store')" method="post">
            @include('point::point.fields')
        </x-form>
    </x-card>
@endsection