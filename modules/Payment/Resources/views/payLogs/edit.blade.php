@extends('paylog::layouts.master')

@section('content')
	<div class="layui-card layui-form">
		<div class="layui-card-header">编辑#{{ $paylog->id }}</div>
		<div class="layui-card-body">
			{!! form()->model($paylog, ['route' =>['payment.pay-logs.update', $paylog->id], 'method' => 'patch', 'class'=>'layui-form ' ]) !!}

				<div class="layui-row layui-col-space10 layui-form-item">
					@include('payment::payLogs.fields')
				</div>

			{!! form()->close() !!}
		</div>
	</div>
@endsection