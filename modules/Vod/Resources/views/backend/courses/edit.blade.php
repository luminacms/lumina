@extends('vod::backend.layouts.master')

@section('content')
	<div class="layui-card layui-form">
		<div class="layui-card-header">编辑#{{ $course->id }}</div>
		<div class="layui-card-body">
			{!! form()->model($course, ['route' =>['vod.courses.update', $course->id], 'method' => 'patch', 'class'=>'layui-form ' ]) !!}

				<div class="layui-row layui-col-space10 layui-form-item">
					@include('vod::backend.courses.fields')
				</div>

			{!! form()->close() !!}
		</div>
	</div>
@endsection