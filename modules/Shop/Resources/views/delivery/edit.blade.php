@extends('core::layouts.modal')

@section('content')
	<x-card>
        <x-form :model="$delivery" :action="route('shop.delivery.update', $delivery->id)" method="patch">
            @include('shop::delivery.fields')
        </x-form>
    </x-card>
@endsection