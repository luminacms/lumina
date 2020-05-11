@extends('core::layouts.modal')

@section('content')
    <x-card>
        <x-form :action="route('shop.sku.store')" method="post">
            @include('shop::sku.fields')
        </x-form>
    </x-card>
@endsection