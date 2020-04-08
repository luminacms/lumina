@extends('vod::backend.layouts.master')

@section('content')
	<div class="layui-card layui-form">
		<div class="layui-card-header">编辑#{{ $vodOrder->id }}</div>
		<div class="layui-card-body">
			{!! form()->model($vodOrder, ['route' =>['vod.vod-orders.update', $vodOrder->id], 'method' => 'patch', 'class'=>'layui-form ' ]) !!}

				<div class="layui-row layui-col-space10 layui-form-item">
					@include('vod::vodOrders.fields')
				</div>

			{!! form()->close() !!}
		</div>
	</div>
@endsection