@extends('shop::layouts.master')

@section('content')
    <x-card>
        <x-form :action="route('shop.spu.store')" method="post">
            @include('shop::spu.fields')
        </x-form>
    </x-card>
@endsection
