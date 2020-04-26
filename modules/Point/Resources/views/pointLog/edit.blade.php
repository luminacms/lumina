@extends('core::layouts.modal')

@section('content')
	<x-card>
        <x-form :model="$pointLog" :action="route('point.point-log.update', $pointLog->id)" method="patch">
            @include('point::pointLog.fields')
        </x-form>
    </x-card>
@endsection