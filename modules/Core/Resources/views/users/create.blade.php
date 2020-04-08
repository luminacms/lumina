@extends('core::layouts.modal')

@section('content')
    <x-card>
        <x-form :action="route('core.users.store')" method="post">
            @include('core::users.fields')
        </x-form>
    </x-card>
@endsection

@push('script')
    <script>
        layui.use('form', function(){
            var form = layui.form

            form.verify({
                title: function(value){
                    if(value.length < 5){
                        return '标题至少得5个字符啊';
                    }
                }
                ,pass: [/(.+){6,12}$/, '密码必须6到12位']
                ,content: function(value){
                    layedit.sync(editIndex);
                }
            })

            form.on('submit(component-form-demo1)', function(data){
                // parent.layer.alert(JSON.stringify(data.field), {
                //     title: '最终的提交信息'
                // })
                return true;
            });
        })
    </script>
@endpush
