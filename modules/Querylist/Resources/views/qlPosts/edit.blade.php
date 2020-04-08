@extends('querylist::layouts.master')

@section('content')
	<div class="layui-card layui-form">
		<div class="layui-card-header">编辑#{{ $qlPost->id }}</div>
		<div class="layui-card-body">
			{!! form()->model($qlPost, ['route' =>['querylist.ql-posts.update', $qlPost->id], 'method' => 'patch', 'class'=>'layui-form ' ]) !!}

				<div class="layui-row layui-col-space10 layui-form-item">
					@include('querylist::qlPosts.fields')
				</div>

			{!! form()->close() !!}
		</div>
	</div>
@endsection