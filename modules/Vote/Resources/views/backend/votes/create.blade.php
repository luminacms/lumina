@extends('vote::backend.layouts.master')

@section('content')
    <div class="layui-card">
        <div class="layui-card-header">新增</div>
        <div class="layui-card-body">
            {{ form()->model($vote, ['route'=>'backend.vote.votes.store', 'method'=>'post', 'class'=>'layui-form ']) }}

                @if(request('model') && request('model_id'))
                <input type="hidden" name="model" value="{{ request('model') }}">
                <input type="hidden" name="model_id" value="{{ request('model_id') }}">
                @endif

                <div class="layui-row layui-col-space10">
                    @include('vote::backend.votes.fields')
                </div>

            {{ form()->close() }}
        </div>
    </div>
@endsection
