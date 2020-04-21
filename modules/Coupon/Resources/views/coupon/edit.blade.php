@extends('core::layouts.modal')

@section('content')
	<x-card>
        <x-form :model="$coupon" :action="route('coupon.coupon.update', $coupon->id)" method="patch">
            @include('coupon::coupon.fields')
        </x-form>
    </x-card>
@endsection
