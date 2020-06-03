@extends('core::layouts.modal')

@section('content')
	<x-card>
        <x-form :model="$spec" :action="route('shop.spec.update', $spec->id)" method="patch">
            @include('shop::spec.fields')
        </x-form>
    </x-card>
@endsection