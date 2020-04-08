@extends('vote::backend.layouts.master')

@section('content')
	<div class="layui-card layui-form">
		<div class="layui-card-header">编辑#{{ $vote->id }}</div>
		<div class="layui-card-body">
			{!! form()->model($vote, ['route' =>['backend.vote.votes.update', $vote->id], 'method' => 'patch', 'class'=>'layui-form ' ]) !!}

				<div class="layui-row layui-col-space10 layui-form-item">
					@include('vote::backend.votes.fields')
				</div>

			{!! form()->close() !!}
		</div>
	</div>
@endsection