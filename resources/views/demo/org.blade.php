@extends('core::layouts.blank')

@section('content')
@section('box', 'width:1050px;margin:0 auto;background-color:transparent;bottom:auto;')
<x-submenu ([
    [
        ['name' => '账号管理', 'uri'=>''],
        ['name' => '全局设置', 'uri'=>'', 'auth'=>Auth::user()->hasRole('SUPER')],
        ['name' => '创建', 'uri'=>'', 'right'=>true, 'modal'=>'lg', 'auth'=>Auth::user()->hasRole('SUPER')],
    ]
])

<style>
    .center{display: table; height: 100%; width: 100%;}
    .center > .center__inner{display: table-cell; vertical-align: middle;}
    .account__item .logo{border:1px solid #ccc;border-radius: 5px;}
</style>

<div class="account-wrap">
    <dl>
        <dd>
            @foreach(\Modules\Core\Models\Organization::all() as $account)
                <div class="panel m-b-lg account__item">
                    <div class="panel-heading" style="font-size: 12px;color: #c3cbd3;">AID：
                        @can('update', $account)
                            <a href="">{{ $account['aid'] }}</a>
                        @else
                            {{ $account['aid'] }}
                        @endif
                    </div>
                    <div class="panel-body">
                        <div class="center" style="padding: 15px;height: 80px;">
                            <div class="center__inner" style="width: 15%"><img src="{{ $account['avatar'] }}" width="75" height="75" class="logo"/></div>
                            <div class="center__inner" style="width: 65%">
                                <p>
                                    @can('update', $account)
                                        <a href="" data-toggle="modal" data-position="fixed" data-size="lg">
                                            <strong style="font-size: 14px">{{ $account['name'] }}</strong><br/><span class="text-gray">{{ $account['appid'] }}</span>
                                        </a>
                                    @else
                                        <strong style="font-size: 14px">{{ $account['name'] }}</strong><br/><span class="text-gray">{{ $account['appid'] }}</span>
                                    @endif
                                </p>
                                @if($account['slug'])
                                    <p>[{{ $account['slug'] }}]</p>
                                @endif

                            </div>
                            <div class="center__inner" style="width: 20%"><a href="" class="btn btn-success btn-block">进入控制台</a></div>
                        </div>
                    </div>
                    <div class="panel-footer clearfix">
                        @if($account['start_at'])
                            <span class="pull-right clearfix text-red">服务时间：{{ $account['start_at'] }}~{{ $account['end_at'] }}</span>
                        @endif
                    </div>
                </div>
            @endforeach
        </dd>
    </dl>
</div>
@endsection

