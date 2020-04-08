@extends('core::layouts.master')

@section('content')
    <x-submenu :items="
        [
            ['name' => '基本资料', 'uri' => route('core.user.profile') ],
            ['name' => '修改密码', 'uri' => route('core.user.resetpasswd'),'on'=>true ],
       ]" />
    <div class="layui-card">
        <div class="layui-card-body">
            <form class="layui-form" id="layuiadmin-form-useradmin" method="post" actio="{{ route('core.user.resetpasswd') }}">
                @csrf
                <div class="layui-form-item">
                    <label class="layui-form-label">原密码</label>
                    <div class="layui-input-inline">
                        <input type="password" name="oldpasswd" lay-verify="required" placeholder="请原密码" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">新密码</label>
                    <div class="layui-input-inline">
                        <input type="password" name="password" lay-verify="required" placeholder="请新密码" autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">重复新密码</label>
                    <div class="layui-input-inline">
                        <input type="password" name="password_confirmation" lay-verify="required" placeholder="重复新密码" autocomplete="off" class="layui-input">
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
