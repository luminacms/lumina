@extends('core::layouts.modal')

@section('content')
    <x-card>
        <x-form :action="route('coupon.coupon.store')" method="post">
            @include('coupon::coupon.fields')
        </x-form>
    </x-card>
@endsection
