@extends('vote::backend.layouts.master')

@section('content')
	<div class="layui-card layui-form">
		<div class="layui-card-header">编辑#{{ $voteOption->id }}</div>
		<div class="layui-card-body">
			{!! form()->model($voteOption, ['route' =>['backend.vote.vote-options.update', $voteOption->id], 'method' => 'patch', 'class'=>'layui-form ' ]) !!}

				<div class="layui-row layui-col-space10 layui-form-item">
					@include('vote::backend.voteOptions.fields')
				</div>

			{!! form()->close() !!}
		</div>
	</div>
@endsection