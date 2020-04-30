@extends('core::layouts.master')

@section('content')
    <link rel="stylesheet" href="https://cdn.xaweiju.com/libs/bootstrap/3.2.0/bootstrap.min.css">
    <div class="clearfix">
        <div class="w-2/12 float-left">
            @include('wechat::backend.__menu')
        </div>
        <div class="w-10/12 float-right">
            @yield('wechat_content')
        </div>
    </div>
@endSection
