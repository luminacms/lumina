@extends('querylist::layouts.master')

@section('content')
	<div class="layui-card layui-form">
		<div class="layui-card-header">编辑#{{ $qlRule->id }}</div>
		<div class="layui-card-body">
			{!! form()->model($qlRule, ['route' =>['querylist.ql-rules.update', $qlRule->id], 'method' => 'patch', 'class'=>'layui-form ' ]) !!}

				<div class="layui-row layui-col-space10 layui-form-item">
					@include('querylist::qlRules.fields')
				</div>

			{!! form()->close() !!}
		</div>
	</div>
@endsection