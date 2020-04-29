@extends('core::layouts.blank')

@section('content')


<style>
.layui-form-autocomplete {position: relative;}
.layui-form-autocomplete dl {display: none; position: absolute; left: 0; top: 0; padding: 5px 0; z-index: 999; min-width: 100%; border: 1px solid #d2d2d2; max-height: 300px; overflow-y: auto; background-color: #fff; border-radius: 2px; box-shadow: 0 2px 4px rgba(0,0,0,.12); box-sizing: border-box;}
.layui-form-autocomplete dl dd, .layui-form-autocomplete dl dt {padding: 0 10px; line-height: 36px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
.layui-form-autocomplete dl dt {font-size: 12px; color: #999;}
.layui-form-autocomplete dl dd {cursor: pointer;}
.layui-form-autocomplete dl dd:hover {background-color: #f2f2f2;}
.layui-form-autocomplete .layui-autocomplete-group dd {padding-left: 20px;}
.layui-form-autocomplete dl dd.layui-autocomplete-tips {padding-left: 10px!important; color: #999;}
.layui-form-autocomplete dl dd.layui-this {background-color: #5FB878; color: #fff;}
.layui-form-autocomplete-focus dl {display: block;}

</style>


<div style="height: 800px">

<input type="text" class="layui-input" id="example"/>


</div>


<script>
    layui.use(['admin','autocomplete'], function(){
        var autocomplete = layui.autocomplete

        autocomplete.render({
            elem: $('#example')[0],
            url: 'example_request_url',
            template_val: '111',
            template_txt: '222',
            onselect: function (resp) {

            }
        })
    })
</script>

@endsection


