@extends('core::layouts.master')

@section('content')
    <div class="layui-card">
        <div class="layui-card-header">基本信息</div>
        <div class="layui-card-body">
            <form class="layui-form" id="layuiadmin-form-useradmin" method="post" actio="{{ route('core.user.profile') }}">
                @csrf
                <div class="layui-form-item">
                    <label class="layui-form-label">用户名</label>
                    <div class="layui-input-inline">
                        <input type="text" name="name" lay-verify="required" placeholder="请输入用户名" autocomplete="off" class="layui-input" value="{{ Auth::user()->name }}">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">邮箱</label>
                    <div class="layui-input-inline">
                        <input type="text" name="email" lay-verify="email" placeholder="请输入邮箱" autocomplete="off" class="layui-input" value="{{ Auth::user()->email }}">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">手机号码</label>
                    <div class="layui-input-inline">
                        <input type="text" name="mobile" lay-verify="phone" placeholder="请输入号码" autocomplete="off" class="layui-input" value="{{ Auth::user()->mobile }}">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">密码</label>
                    <div class="layui-input-inline">
                        <input type="text" name="password"  placeholder="不填则不更改" autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item layui-layout-admin">
                    <div class="layui-input-block">
                        <div class="layui-footer z-50" style="left:0;">
                            <button class="layui-btn" lay-submit lay-filter="core_user_profile">{{__('main.submit')}}</button>
                            <button type="reset" class="layui-btn layui-btn-primary">{{__('main.cancel')}}</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>

@endsection

@push('script')
    <script>
        layui.use('form', function(){
            var form = layui.form;
        })
    </script>
@endpush
