@extends('core::layouts.modal')

@section('content')
    <x-card>
        <x-form :action="route('shop.brand.store')" method="post">
            @include('shop::brand.fields')
        </x-form>
    </x-card>
@endsection