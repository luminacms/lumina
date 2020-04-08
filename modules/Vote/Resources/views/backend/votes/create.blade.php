@extends('vote::backend.layouts.master')

@section('content')
    <x-card>
        <x-form :action="route('backend.vote.votes.store')" method="post">
            @if(request('model') && request('model_id'))
            <input type="hidden" name="model" value="{{ request('model') }}">
            <input type="hidden" name="model_id" value="{{ request('model_id') }}">
            @endif

            <div class="layui-row layui-col-space10">
                @include('vote::backend.votes.fields')
            </div>
        </x-form>
    </x-card>
@endsection
