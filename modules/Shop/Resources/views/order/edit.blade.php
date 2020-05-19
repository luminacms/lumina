@extends('core::layouts.modal')

@section('content')
	<x-card>
        <x-form :model="$order" :action="route('shop.order.update', $order->id)" method="patch">
            @include('shop::order.fields')
        </x-form>
    </x-card>
@endsection