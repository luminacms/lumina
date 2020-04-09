@extends('paylog::layouts.master')

@section('content')
    <div class="layui-card">
        <div class="layui-card-header">新增</div>
        <div class="layui-card-body">
            {{ form()->open(['route'=>'payment.pay-logs.store', 'method'=>'post', 'class'=>'layui-form ']) }}
                <input type="hidden" name="create_by" value="{{ !auth()->guest()?auth()->id():0 }}">

                <div class="layui-row layui-col-space10">
                    @include('payment::payLogs.fields')
                </div>

            {{ form()->close() }}
        </div>
    </div>
@endsection