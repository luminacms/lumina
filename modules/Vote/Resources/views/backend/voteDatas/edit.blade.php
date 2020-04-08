@extends('votedata::layouts.master')

@section('content')
	<div class="layui-card layui-form">
		<div class="layui-card-header">编辑#{{ $votedata->id }}</div>
		<div class="layui-card-body">
			{!! form()->model($votedata, ['route' =>['backend.vote.vote-datas.update', $votedata->id], 'method' => 'patch', 'class'=>'layui-form ' ]) !!}

				<div class="layui-row layui-col-space10 layui-form-item">
					@include('vote::backend.voteDatas.fields')
				</div>

			{!! form()->close() !!}
		</div>
	</div>
@endsection