@extends('core::layouts.blank')

@section('content')

<style>


.urp-cascader-content{white-space: nowrap;background: #fff;border: 1px solid #e4e7ed;border-right: 0;border-radius: 2px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);left: 0;top: 100%;margin-top: 12px}
ul.urp-cascader-child{display: inline-block;vertical-align: top;height: 260px;overflow: auto;border-right: 1px solid #e4e7ed;background-color: #fff;box-sizing: border-box;margin: 0;padding: 6px 0;min-width: 135px}
ul.urp-cascader-child>li>i{float: right;margin-left: 15px;margin-top: 3px;}
ul.urp-cascader-child>li{font-size: 14px;padding: 8px 20px;position: relative;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;color: #606266;height: 34px;line-height: 1.5;box-sizing: border-box;cursor: pointer;outline: none}
ul.urp-cascader-child li.active{color: #409eff}
ul.urp-cascader-child>li:hover{background-color: #f5f5f5}

</style>

    <?php $fullPath = Modules\Shop\Models\Category::getParents(467); ?>

    <div style="min-height: 500px;width:50%;margin:0 auto;">
        <div class="layui-form-item layui-input-icon inline-block">
            {{-- <i class="j_cancel fa fa-times-circle"></i>

            <label class=""><i class="fa fa-search"></i></label> --}}
            <input type="hidden" id="a" class="layui-input" placeholder="输入关键词搜索分类" >

            <div id="j_selected" class="mt-4">
                已选择：{{ $fullPath->implode('label', ' > ') }}
            </div>
        </div>
    </div>

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
        value: @json($fullPath->pluck('id')->all()),
        success: function (valData,labelData) {
            console.log(valData[valData.length-1]);
            $("#j_selected").html('已选择：' + labelData.join('>'))
        }
    });

})
</script>

@endsection
