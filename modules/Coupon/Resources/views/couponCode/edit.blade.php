@extends('core::layouts.modal')

@section('content')
	<x-card>
        <x-form :model="$couponCode" :action="route('coupon.coupon-code.update', $couponCode->id)" method="patch">
            @include('coupon::couponCode.fields')
        </x-form>
    </x-card>
@endsection
