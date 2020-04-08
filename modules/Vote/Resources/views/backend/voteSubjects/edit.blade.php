@extends('vote::backend.layouts.master')

@section('content')
	<div class="layui-card layui-form">
		<div class="layui-card-header">编辑#{{ $voteSubject->id }}</div>
		<div class="layui-card-body">
			{!! form()->model($voteSubject, ['route' =>['backend.vote.vote-subjects.update', $voteSubject->id], 'method' => 'patch', 'class'=>'layui-form ' ]) !!}

				<div class="layui-row layui-col-space10 layui-form-item">
					@include('vote::backend.voteSubjects.fields')
				</div>

			{!! form()->close() !!}
		</div>
	</div>
@endsection