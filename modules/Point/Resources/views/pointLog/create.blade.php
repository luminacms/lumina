@extends('core::layouts.modal')

@section('content')
    <x-card>
        <x-form :action="route('point.point-log.store')" method="post">
            @include('point::pointLog.fields')
        </x-form>
    </x-card>
@endsection