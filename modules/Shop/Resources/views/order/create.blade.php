@extends('core::layouts.modal')

@section('content')
    <x-card>
        <x-form :action="route('shop.order.store')" method="post">
            @include('shop::order.fields')
        </x-form>
    </x-card>
@endsection