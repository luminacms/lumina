@extends('core::layouts.modal')

@section('content')
	<x-card>
        <x-form :model="$point" :action="route('point.point.update', $point->id)" method="patch">
            @include('point::point.fields')
        </x-form>
    </x-card>
@endsection