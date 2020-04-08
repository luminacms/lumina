@extends('vote::backend.layouts.master')

@section('content')
    <div class="layui-card">
        <div class="layui-card-header">新增</div>
        <div class="layui-card-body">
            {{ form()->open(['route'=>'backend.vote.vote-options.store', 'method'=>'post', 'class'=>'layui-form ']) }}


                <div class="layui-row layui-col-space10">
                    @include('vote::backend.voteOptions.fields')
                </div>

                <input type="hidden" name="subject_id" value="{{ request('subject_id') }}">
                <input type="hidden" name="vote_id" value="{{ request('vote_id') }}">
            {{ form()->close() }}
        </div>
    </div>
@endsection
