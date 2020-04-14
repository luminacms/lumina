@extends('core::layouts.blank')

@push('style')
    <style>
        .user-login-header h2{margin-bottom: 10px;font-weight: 300;font-size: 30px;color: #000}
        .user-login-body .layui-form-item{position: relative}
        .user-login-icon{position: absolute;left: 1px;top: 1px;width: 38px;line-height: 36px;text-align: center;color: #d2d2d2}
        .user-login-body .layui-form-item .layui-input{padding-left: 38px}
        html{line-height: 1.15;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;}
        body{margin: 0;}
        header, nav, section{display: block;}
        figcaption, main{display: block;}
        a{background-color: transparent;-webkit-text-decoration-skip: objects;}
        strong{font-weight: inherit;}
        strong{font-weight: bolder;}
        code{font-family: monospace, monospace;font-size: 1em;}
        dfn{font-style: italic;}
        svg:not(:root){overflow: hidden;}
        button, input{font-family: sans-serif;font-size: 100%;line-height: 1.15;margin: 0;}
        button, input{overflow: visible;}
        button{text-transform: none;}
        button, html [type="button"], [type="reset"], [type="submit"]{-webkit-appearance: button;}
        button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner{border-style: none;padding: 0;}
        button:-moz-focusring, [type="button"]:-moz-focusring, [type="reset"]:-moz-focusring, [type="submit"]:-moz-focusring{outline: 1px dotted ButtonText;}
        legend{-webkit-box-sizing: border-box;box-sizing: border-box;color: inherit;display: table;max-width: 100%;padding: 0;white-space: normal;}
        [type="checkbox"], [type="radio"]{-webkit-box-sizing: border-box;box-sizing: border-box;padding: 0;}
        [type="number"]::-webkit-inner-spin-button, [type="number"]::-webkit-outer-spin-button{height: auto;}
        [type="search"]{-webkit-appearance: textfield;outline-offset: -2px;}
        [type="search"]::-webkit-search-cancel-button, [type="search"]::-webkit-search-decoration{-webkit-appearance: none;}
        ::-webkit-file-upload-button{-webkit-appearance: button;font: inherit;}
        menu{display: block;}
        canvas{display: inline-block;}
        template{display: none;}
        [hidden]{display: none;}
        html{-webkit-box-sizing: border-box;box-sizing: border-box;font-family: sans-serif;}
        *, *::before, *::after{-webkit-box-sizing: inherit;box-sizing: inherit;}
        p{margin: 0;}
        button{background: transparent;padding: 0;}
        button:focus{outline: 1px dotted;outline: 5px auto -webkit-focus-ring-color;}
        *, *::before, *::after{border-width: 0;border-style: solid;border-color: #dae1e7;}
        button, [type="button"], [type="reset"], [type="submit"]{border-radius: 0;}
        button, input{font-family: inherit;}
        input::-webkit-input-placeholder{color: inherit;opacity: .5;}
        input:-ms-input-placeholder{color: inherit;opacity: .5;}
        input::-ms-input-placeholder{color: inherit;opacity: .5;}
        input::placeholder{color: inherit;opacity: .5;}
        button, [role=button]{cursor: pointer;}
        .bg-transparent{background-color: transparent;}
        .bg-white{background-color: #fff;}
        .bg-teal-light{background-color: #64d5ca;}
        .bg-blue-dark{background-color: #2779bd;}
        .bg-indigo-light{background-color: #7886d7;}
        .bg-purple-light{background-color: #a779e9;}
        .bg-no-repeat{background-repeat: no-repeat;}
        .bg-cover{background-size: cover;}
        .border-grey-light{border-color: #dae1e7;}
        .hover\:border-grey:hover{border-color: #b8c2cc;}
        .rounded-lg{border-radius: .5rem;}
        .border-2{border-width: 2px;}
        .hidden{display: none;}
        .flex{display: -webkit-box;display: -ms-flexbox;display: flex;}
        .items-center{-webkit-box-align: center;-ms-flex-align: center;align-items: center;}
        .justify-center{-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;}
        .font-sans{font-family: Nunito, sans-serif;}
        .font-light{font-weight: 300;}
        .font-bold{font-weight: 700;}
        .font-black{font-weight: 900;}
        .h-1{height: .25rem;}
        .leading-normal{line-height: 1.5;}
        .m-8{margin: 2rem;}
        .my-3{margin-top: .75rem;margin-bottom: .75rem;}
        .mb-8{margin-bottom: 2rem;}
        .max-w-sm{max-width: 30rem;}
        .min-h-screen{min-height: 100vh;}
        .py-3{padding-top: .75rem;padding-bottom: .75rem;}
        .px-6{padding-left: 1.5rem;padding-right: 1.5rem;}
        .pb-full{padding-bottom: 100%;}
        .absolute{position: absolute;}
        .relative{position: relative;}
        .pin{top: 0;right: 0;bottom: 0;left: 0;}
        .text-black{color: #22292f;}
        .text-grey-darkest{color: #3d4852;}
        .text-grey-darker{color: #606f7b;}
        .text-2xl{font-size: 1.5rem;}
        .text-5xl{font-size: 3rem;}
        .uppercase{text-transform: uppercase;}
        .antialiased{-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;}
        .tracking-wide{letter-spacing: .05em;}
        .w-16{width: 4rem;}
        .w-full{width: 100%;}
        @media (min-width: 768px){.md\:bg-left{background-position: left;}
            .md\:bg-right{background-position: right;}
            .md\:flex{display: -webkit-box;display: -ms-flexbox;display: flex;}
            .md\:my-6{margin-top: 1.5rem;margin-bottom: 1.5rem;}
            .md\:min-h-screen{min-height: 100vh;}
            .md\:pb-0{padding-bottom: 0;}
            .md\:text-3xl{font-size: 1.875rem;}
            .md\:text-15xl{font-size: 9rem;}
            .md\:w-1\/2{width: 60%;}
            .md\:w-1\/3{width: 40%;}} @media (min-width: 992px){.lg\:bg-center{background-position: center;}}
    </style>
@endpush

@section('content')

<div class="flex min-h-screen">
    <div class="relative pb-full md:flex md:pb-0 md:min-h-screen lg:w-2/3 block sm:hidden">
        <div style="background-image: url(http://cdn.xbhub.com/img/svg/{{ \Illuminate\Support\Arr::random(['1','2','3','4']) }}.svg)" class="absolute pin bg-cover bg-no-repeat md:bg-left lg:bg-center"></div>
    </div>

    <div class="lg:w-1/3 md:w-full bg-white flex items-center justify-center">
        <div class="max-w-sm m-8">
            <div class="user-login user-display-show" id="xb-user-login">

                @if (Route::has('register'))
                <div class="mb-6"><a href="{{ route('register') }}"><< 注册</a></div>
                @endif
                <div class="user-login-main">
                    <div class="user-login-box user-login-header">
                        <h2>后台管理</h2>
                    </div>
                    <div class="user-login-box user-login-body layui-form" style="width:317px;">
                        <x-form :action="route('login')" method="post">

                            <div class="layui-form-item">
                                <label class="user-login-icon fa fa-user" for="xb-user-login-username"></label>
                                <input type="text" name="email" class="layui-input" lay-verify="required|email" placeholder="邮箱" value="{{ old('email') }}">
                            </div>
                            <div class="layui-form-item">
                                <label class="user-login-icon fa fa-lock" for="xb-user-login-password"></label>
                                <input type="password" name="password" class="layui-input" id="xb-user-login-password" lay-verify="required" placeholder="密码">
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-row">
                                    <div class="layui-col-xs7">
                                        <label class="user-login-icon fa fa-shield" for="xb-user-login-vercode"></label>
                                        <input type="text" name="captcha" class="layui-input" lay-verify="required" placeholder="验证码"/>
                                    </div>
                                    <div class="layui-col-xs5">
                                        <div style="margin-left: 10px;">
                                            <img src="{!! captcha_src() !!}" class="hand" onclick="$(this).attr('src', $(this).attr('src')+Math.random())"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="layui-form-item" style="margin-bottom: 20px;">
                                <input type="checkbox" name="remember" lay-skin="primary" title="记住密码">
                                <a href="{{ route('password.request') }}" class="float-right mt-4">忘记密码？</a>
                            </div>
                            <div class="layui-form-item">
                                <button class="layui-btn layui-btn-fluid" lay-submit lay-filter="xb-user-login-submit" type="submit">登 入</button>
                            </div>

                        </x-form>
                    </div>
                </div>

                <div class="layui-trans user-login-footer">
                    <p>© 2018 <a href="http://www.xbhub.com" target="_blank">Lumina</a></p>
                </div>

            </div>
        </div>
    </div>
</div>

@endsection

@push('script')
    <script>
        layui.use('form')
        if(window.parent!=window){
            window.parent.location.reload(true);
        }
    </script>
@endpush

