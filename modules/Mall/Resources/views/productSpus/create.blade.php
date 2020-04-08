@extends('core::layouts.master')

@section('content')
    
    <div class="layui-card layui-form">
        <div class="layui-card-header">新增</div>
        <div class="layui-card-body">
            <form action="{{ route('mall.product-spus.store') }}" method="post" class="layui-form " data-keep>
                {{ csrf_field() }}
                <input type="hidden" name="create_by" value="{{ !Auth::guest()?Auth::user()->id:0 }}">

                <div class="layui-row layui-col-space10 layui-form-item">
                    @include('mall::productSpus.fields')
                </div>
            </form>
        </div>
    </div>
            
@endsection

@push('script')
    <script>
        layui.use('form', function(){
            var form = layui.form

        })
    </script>
@endpush
