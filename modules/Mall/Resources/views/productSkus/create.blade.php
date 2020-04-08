@extends('core::layouts.master')

@section('content')
    
    <div class="layui-card layui-form">
        <div class="layui-card-header">新增</div>
        <div class="layui-card-body">
            <form action="{{ route('mall.productSkus.store') }}" method="post">
                {{ csrf_field() }}

                <div class="layui-row layui-col-space10 layui-form-item">
                    @include('mall::productSkus.fields')
                </div>
            </form>
        </div>
    </div>
            
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
                parent.layer.alert(JSON.stringify(data.field), {
                    title: '最终的提交信息'
                })
                return false;
            });
        })
    </script>
@endpush
