@extends('core::layouts.modal')

@section('content')
	<x-card>
        <x-form :model="$spu" :action="route('shop.spu.update', $spu->id)" method="patch">
            @include('shop::spu.fields')
        </x-form>
    </x-card>
@endsection
