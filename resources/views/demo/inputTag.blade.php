@extends('core::layouts.full')

@section('content')

<div class="tags" id="tags">
    <input type="text" name="" id="inputTags" placeholder="回车生成标签" autocomplete="off" class="layui-input">
</div>
<script type="text/javascript">
    layui.extend({
        'inputTags': 'extends/inputTags/inputTags'
    }).use(['inputTags'],function(){
        var inputTags = layui.inputTags;
        inputTags.render({
            elem:'#inputTags',
            content: ['标题一','标题二'],
            aldaBtn: true,
            done: function(value){
                console.log(value)
            }
        })

    })
</script>

@endsection
