@extends('vod::backend.layouts.master')

@section('content')
	<div class="layui-card layui-form">
		<div class="layui-card-header">编辑#{{ $lesson->id }}</div>
		<div class="layui-card-body">
			{!! form()->model($lesson, ['route' =>['vod.lessons.update', $lesson->id], 'method' => 'patch', 'class'=>'layui-form ' ]) !!}

				<div class="layui-row layui-col-space10 layui-form-item">
					@include('vod::backend.lessons.fields')
				</div>

			{!! form()->close() !!}
		</div>
	</div>
@endsection