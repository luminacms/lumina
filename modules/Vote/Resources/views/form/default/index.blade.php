<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdn.sxmgcm.cn/libs/tailwind/1.0.4/tailwindcss.min.css">
    <title>{{ $vote->title }}</title>
</head>

<body>
<!-- 头 部 -->
<header>
    <!-- banner -->
    <img class="w-full"
         src="http://img.51miz.com/Element/00/59/01/66/10cbdd91_E590166_7d968219.jpg!/quality/90/unsharp/true/compress/true/format/jpg"
         alt="">
</header>

<!-- main -->
<div class="g-wrap p-4 text-sm">
    <div class="title text-center text-xl pt-2 pb-3 border-b-2 border-gray-200">{{ $vote->title }}</div>

    <!-- 表单 -->
    {{ form()->open(['route'=>['vote.form', $vote], 'method'=>'post', 'class'=>'layui-form ']) }}

        @foreach(['name', 'nickname', 'mobile', 'address', 'company', 'visit_no', 'invited_by', 'score'] as $_filed)
            <p id="q1" class="py-2 block">{{ __('main.'.$_filed, 'vote') }}</p>
            <label for="num" class="border-gray-300 border w-full block h-10">
                <input class="w-full h-8" name="{{ $_filed }}" type="text" size="22" id="q1" /><br />
            </label>
        @endforeach

        <p class="py-2 block">其他字段（请已数值格式上传）</p>
        <label class="w-full block border border-gray-300 mb-4">
            <input type="text" name="fields[ext1]" class="w-full h-8" placeholder="附件字段1">
        </label>
        <label class="w-full block border border-gray-300 mb-4">
            <input type="text" name="fields[ext2]" class="w-full h-8" placeholder="附件字段2">
        </label>


        <input name="" type="submit" class="m-auto block h-8 bg-blue-500 text-white w-11/12 rounded mt-5" value="提交" />

    {{ form()->close() }}
</div>


<script src="https://cdn.sxmgcm.cn/libs/jquery/jquery.min.js"></script>
<script>

</script>


</body>

</html>
