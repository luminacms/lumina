@extends('core::layouts.modal')

@section('content')
	<x-card>
        <x-form :model="$category" :action="route('shop.category.update', $category->id)" method="patch">
            @include('shop::category.fields')
        </x-form>
    </x-card>
@endsection