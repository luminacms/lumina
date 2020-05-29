@extends('core::layouts.blank')

@section('content')

<style>


.urp-cascader-content{white-space: nowrap;background: #fff;border-right: 0;border-radius: 2px;left: 0;top: 100%;width: 80%;margin:12px auto;}
ul.urp-cascader-child{display: inline-block;vertical-align: top;height: 260px;overflow: auto;border-right: 1px solid #e4e7ed;background-color: #fff;box-sizing: border-box;margin: 0;padding: 6px 0;min-width: 135px}
ul.urp-cascader-child>li>i{float: right;margin-left: 15px;margin-top: 3px;}
ul.urp-cascader-child>li{font-size: 14px;padding: 8px 20px;position: relative;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;color: #606266;height: 34px;line-height: 1.5;box-sizing: border-box;cursor: pointer;outline: none}
ul.urp-cascader-child li.active{color: #409eff}
ul.urp-cascader-child>li:hover{background-color: #f5f5f5}

</style>

    <div style="min-height: 500px;width:50%;margin:0 auto;">
        <div class="layui-form-item layui-input-icon inline-block">
            {{-- <i class="j_cancel fa fa-times-circle"></i>

            <label class=""><i class="fa fa-search"></i></label> --}}

            <div id="j_selected" class="mt-4">
                已选择：
            </div>

            <input type="text" id="j_city" placeholder="请选择城市" class="layui-input" />

            <div id="a" style="display: none"></div>

        </div>
    </div>

<script>

layui.extend({
    'cascader': 'extends/cascader/cascader'
}).use('cascader', function(){
    var cascader = layui.cascader;


    $("#j_city").click(function(){

        layer.open({
            type: 1,
            content: $('#a'),
            area: ['650px', '380px'],
            btn: ['确认', '取消'],
            yes: function(index, layero){
                console.log(layero)
            },
            cancel: function(){

            }
        })


    });


    var data = @json(Modules\Core\Models\Region::getSimpleTree());
    var val = @json([]);
    var cas=cascader({
        elem: "#a",
        data: data,
        value: '',
        success: function (valData,labelData) {
            console.log(valData[valData.length-1]);
            $("#j_selected").html('已选择：' + labelData.join('>'))
        }
    });

})
</script>

@endsection
