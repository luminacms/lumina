@extends('wechat::layouts.master')

@section('content_wechat')
    <x-submenu :items="[
        ['label' => '公众号管理', 'uri'=>route('wechat.index')],
        ['label' => '添加', 'uri'=>route('backend.cases.create'), 'right'=>true, 'modal'=>'lg'],
        ['label' => '模拟器', 'uri'=>route('wechat.emulator', 11), 'modal' => 'lg', 'right' =>true, 'style'=>'margin-right: 5px;background-color:transparent;color:#000;']
    ]"/>


    <div class="page-header">
        <h4><i class="fa fa-android"></i> {{ __('wechat::field.'.request('msg_type')) }}回复</h4>
    </div>

    <a href="{{ route('wechat.msg.create', ['type' => request('type'), 'msg_type'=>request('msg_type')]) }}" class="btn btn-primary m-b-lg" data-toggle="modal" data-position="fixed">添加规则</a>


    @foreach($msgs as $msg)
        <div class="panel panel-default">
            <div class="panel-body">
                {{ $msg['content'] }}
            </div>
            <div class="panel-footer">
                关键字：{{ $msg->getReplyStr() }}
            </div>
        </div>
    @endforeach

@endsection
