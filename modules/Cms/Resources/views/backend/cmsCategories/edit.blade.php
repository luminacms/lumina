@extends('cms::backend.layouts.master')

@section('content')
	<div class="layui-card layui-form">
		<div class="layui-card-header">编辑#{{ $cmsCategory->id }}</div>
		<div class="layui-card-body">
			{!! form()->model($cmsCategory, ['route' =>['backend.cms.cms-categories.update', $cmsCategory->id], 'method' => 'patch', 'class'=>'layui-form ' ]) !!}

				<div class="layui-row layui-col-space10 layui-form-item">
					@include('cms::backend.cmsCategories.fields')
				</div>

			{!! form()->close() !!}
		</div>
	</div>
@endsection