<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdn.xaweiju.com/libs/tailwind/1.0.4/tailwindcss.min.css">
    <title>调查问卷</title>
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
<div class="g-wrap p-4 text-sm container mx-auto">
    <div class="title text-center text-xl pt-2 pb-3 border-b-2 border-gray-200">{{ $vote->title }}</div>

    <!-- 表单 -->
    <form action="/demo.php" method="get" id="form" class="py-2" enctype="multipart/form-data">

        @foreach($vote->subjects as $_subject)
        <p id="q1" class="py-2 block"> Q{{ $loop->index+1 }}.{{ $_subject->title }}</p>

        @switch($_subject->type)
        @case('radio')
            @foreach($_subject->options as $_option)
                <label class="w-full block border border-gray-300 px-2 py-3">
                    <input class="border border-b-0 bg-gray-300 align-middle" name="kind" type="radio"
                        value="{{ $_option->id }}" />
                    <span class="align-middle">{{ $_option->value }}</span>
                    <br />
                </label>
            @endforeach
        @break
        @case('checkbox')
            @foreach($_subject->options as $_option)
                <label class="w-full block border border-gray-300  px-2 py-3">
                    <input id="quality" class="border border-b-0 bg-gray-300 px-2 py-1 align-middle" name="quality[]" type="checkbox"
                        value="{{ $_option->id }}" /><span class="align-middle">{{ $_option->value }}</span><br />
                </label>
            @endforeach
        @break;
        @endswitch

        {{-- <label for="num" class="border-gray-300 border w-full block h-10">
            <input class="w-full h-8" name="text" type="text" size="22" id="q1" /><br />
        </label> --}}
        @endforeach


        {{-- <p class="py-2 block">Q2.您的手机返修原因是?(多选)</p>

        <label class="w-full block border border-gray-300  px-2 py-3">
            <input id="quality" class="border border-b-0 bg-gray-300 px-2 py-1 align-middle" name="quality[]" type="checkbox"
                   value="软件质量问题" /><span class="align-middle">软件质量问题</span><br />
        </label>
        <label class="w-full block border border-gray-300 border-t-0  px-2 py-3" >
            <input id="quality" class="border border-t-0 bg-gray-300 align-middle" name="quality[]" type="checkbox"
                   value="硬件质量问题" /><span class="align-middle">硬件质量问题<span><br />
        </label>

        <p class="py-2 block">Q3.您最常用的手机操作系统是?</p>

        <label class="w-full block border border-gray-300 px-2 py-3">
            <input class="border border-b-0 bg-gray-300 align-middle" name="kind" type="radio"
                   value="安卓Android" />
            <span class="align-middle">安卓Android</span>
            <br />
        </label>
        <label class="w-full block border border-gray-300 border-t-0  px-2 py-3">
            <input class="border border-b-0 bg-gray-300 align-middle" name="kind" type="radio"
                   value="Windows操作系统" />
            <span class="align-middle">Windows操作系统</span>
            <br />
        </label>
        <label class="w-full block border border-gray-300 border-t-0  px-2 py-3">
            <input class="border border-b-0 bg-gray-300 align-middle" name="kind" type="radio"
                   value="苹果iOS操作系统" />
            <span class="align-middle">
                            苹果iOS操作系统
                    </span>
            <br />
        </label>
        <label class="w-full block border border-gray-300 border-t-0  px-2 py-3">
            <input class="border border-b-0 bg-gray-300 align-middle" name="kind" type="radio"
                   value="黑莓RIM操作系统" />
            <span class="align-middle">黑莓RIM操作系统</span>
            <br />
        </label>

        <label class="w-full block border border-gray-300 border-t-0  px-2 py-3">
            <input class="border border-b-0 bg-gray-300 align-middle" name="kind" type="radio" value="其他,请注明" />
            <span  class="align-middle">其他,请注明</span>
            <br />
        </label>

        <label class="w-full block border border-gray-300 border-t-0  px-2 py-3">
            <input class="border border-b-0 bg-gray-300 align-middle" name="kind" type="radio" value="不清楚" />
            <span class="align-middle">不清楚</span>
            <br />
        </label>
        <p class="py-2 block">Q4.除上述提到的产品外，你还主要使用什么在线教育产品？请列举?</p>
        <label class="w-full block border border-gray-300">
            <textarea class="w-full bg-white" name="des" id="" cols="30" rows="5"></textarea>
        </label> --}}

        <input name="" type="submit" class="m-auto block h-8 bg-blue-500 text-white w-11/12 rounded mt-5"
               value="提交" />
    </form>
</div>


</body>

</html>
