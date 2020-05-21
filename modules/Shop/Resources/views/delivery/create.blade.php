@extends('core::layouts.modal')

@section('content')
    <x-card>
        <x-form :action="route('shop.delivery.store')" method="post">
            @include('shop::delivery.fields')
        </x-form>
    </x-card>
@endsection