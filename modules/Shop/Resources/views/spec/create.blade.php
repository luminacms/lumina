@extends('core::layouts.modal')

@section('content')
    <x-card>
        <x-form :action="route('shop.spec.store')" method="post">
            @include('shop::spec.fields')
        </x-form>
    </x-card>
@endsection