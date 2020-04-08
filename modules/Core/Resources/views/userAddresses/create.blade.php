@extends('core::layouts.master')

@section('content')
    
    <div class="layui-card layui-form">
        <div class="layui-card-header">新增</div>
        <div class="layui-card-body">
            <form action="{{ route('core.user-addresses.store') }}" method="post" class="layui-form ">
                {{ csrf_field() }}
                <input type="hidden" name="user_id" value="{{ !Auth::guest()?Auth::user()->id:0 }}">

                <div class="layui-row layui-col-space10 layui-form-item">
                    @include('core::userAddresses.fields')
                </div>
            </form>
        </div>
    </div>
            
@endsection

@push('script')
    <script>
        layui.use('form', function(){
            var form = layui.form


            form.on('submit(submit-form)', function(data){
                return true;
            });
        })
    </script>
@endpush
