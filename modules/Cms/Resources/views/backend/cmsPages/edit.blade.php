@extends('cms::backend.layouts.master')

@section('content')
	<div class="layui-card layui-form">
		<div class="layui-card-header">编辑#{{ $cmsPage->id }}</div>
		<div class="layui-card-body">
			{!! form()->model($cmsPage, ['route' =>['cms.cms-pages.update', $cmsPage->id], 'method' => 'patch', 'class'=>'layui-form ' ]) !!}

				<div class="layui-row layui-col-space10 layui-form-item">
					@include('cms::backend.cmsPages.fields')
				</div>

			{!! form()->close() !!}
		</div>
	</div>
@endsection