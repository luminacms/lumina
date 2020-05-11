@extends('core::layouts.modal')

@section('content')
	<x-card>
        <x-form :model="$sku" :action="route('shop.sku.update', $sku->id)" method="patch">
            @include('shop::sku.fields')
        </x-form>
    </x-card>
@endsection