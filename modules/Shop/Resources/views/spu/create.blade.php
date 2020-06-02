@extends('core::layouts.modal')

@push('style')
    <style>
        .urp-cascader-content{white-space: nowrap;background: #fff;border: 1px solid #e4e7ed;border-right: 0;border-radius: 2px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);left: 0;top: 100%;margin-top: 12px}
        ul.urp-cascader-child{display: inline-block;vertical-align: top;height: 260px;overflow: auto;border-right: 1px solid #e4e7ed;background-color: #fff;box-sizing: border-box;margin: 0;padding: 6px 0;min-width: 135px}
        ul.urp-cascader-child>li>i{float: right;margin-left: 15px;margin-top: 3px;}
        ul.urp-cascader-child>li{font-size: 14px;padding: 8px 20px;position: relative;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;color: #606266;height: 34px;line-height: 1.5;box-sizing: border-box;cursor: pointer;outline: none}
        ul.urp-cascader-child li.active{color: #409eff}
        ul.urp-cascader-child>li:hover{background-color: #f5f5f5}
    </style>
@endpush
@section('content')
    <x-card>

        @if(request('category_id'))
            <x-form :action="route('shop.spu.store')" method="post">
                @include('shop::spu.fields')
            </x-form>
        @else
            <div class="layui-form-item inline-block">
                <label for="">请选择商品栏目：</label>
                {{-- <i class="j_cancel fa fa-times-circle"></i>

                <label class=""><i class="fa fa-search"></i></label> --}}
                <input type="hidden" class="layui-input" placeholder="输入关键词搜索分类" >
                <div id="a"></div>

                <div id="j_selected" class="mt-4"></div>
            </div>
            <div>
                <form action="{{ url()->full() }}">
                    <input type="hidden" name="category_id" id="j_category_id" />
                    <input type="hidden" name="type" value="{{ request('type') }}" />
                    <button type="submit" class="layui-btn layui-btn-success">下一步</button>
                </form>
            </div>
            @push('script')
            <script>

                layui.extend({
                    'cascader': 'extends/cascader/cascader'
                }).use('cascader', function(){
                    var cascader = layui.cascader;


                    var data = @json(Modules\Shop\Models\Category::getSimpleTree());
                    var val = @json([]);
                    var cas=cascader({
                        elem: "#a",
                        data: data,
                        value: [],
                        success: function (valData,labelData) {
                            $("#j_category_id").val(valData[valData.length-1])
                            $("#j_selected").html('已选择：' + labelData.join('>'))
                        }
                    });

                })
            </script>
            @endpush
        @endif
    </x-card>
@endsection
