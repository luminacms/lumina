@extends('paytransaction::layouts.master')

@section('content')
	<div class="layui-card layui-form">
		<div class="layui-card-header">编辑#{{ $paytransaction->id }}</div>
		<div class="layui-card-body">
			{!! form()->model($paytransaction, ['route' =>['payment.pay-transactions.update', $paytransaction->id], 'method' => 'patch', 'class'=>'layui-form ' ]) !!}

				<div class="layui-row layui-col-space10 layui-form-item">
					@include('payment::payTransactions.fields')
				</div>

			{!! form()->close() !!}
		</div>
	</div>
@endsection