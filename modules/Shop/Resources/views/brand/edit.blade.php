@extends('core::layouts.modal')

@section('content')
	<x-card>
        <x-form :model="$brand" :action="route('shop.brand.update', $brand->id)" method="patch">
            @include('shop::brand.fields')
        </x-form>
    </x-card>
@endsection