@extends('core::layouts.modal')

@section('content')
    <x-card>
        <x-form :action="route('coupon.coupon-code.store')" method="post">
            @include('coupon::couponCode.fields')
        </x-form>
    </x-card>
@endsection
