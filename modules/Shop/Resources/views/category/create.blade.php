@extends('core::layouts.modal')

@section('content')
    <x-card>
        <x-form :action="route('shop.category.store')" method="post">
            @include('shop::category.fields')
        </x-form>
    </x-card>
@endsection