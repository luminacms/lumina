@include('core::layouts._head')


<div class="container bg-white px-16 py-24">
    <div class="flex">
        <div class="w-2/12">
            <div class="panel">
                <div class="panel-hd">接口</div>
                <div class="panel-bd">

                </div>
            </div>
        </div>
        <div class="w-10/12">
            <div class="panel mb-20">
                <div class="panel-bd">
                    <form action="" class="layui-form" data-keep>
                        url: <input type="text" name="url" class="border w-full">
                        params: <textarea name="params" id="" cols="30" rows="10" class="border w-full"></textarea>

                        <input type="button" lay-submit lay-filter="*" value="提交">
                    </form>

                </div>
            </div>
            <div class="panel layui-tab">
                <div class="panel-hd">
                    <ul class="layui-tab-title">
                        <li class="layui-this">Content</li>
                        <li>Headers</li>
                    </ul>
                </div>
                <div class="panel-bd layui-tab-content">
                    <div class="layui-tab-item layui-show"><pre class="layui-code" id="content"></pre></div>
                    <div class="layui-tab-item"><pre class="layui-code" id="header"></pre></div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    layui.use(['element', 'form', 'admin', 'code'], function(){
        var element = layui.element,
            admin = layui.admin,
            form = layui.form;

        form.on('submit(*)', function(data){
            var _data = $.parseJSON(data.field.params);

            var formatJson = function (json) {
                var formatted = '',     //转换后的json字符串
                    padIdx = 0,         //换行后是否增减PADDING的标识
                    PADDING = '    ';   //4个空格符
                /**
                 * 将对象转化为string
                 */
                if (typeof json !== 'string') {
                    json = JSON.stringify(json);
                }
                /**
                 *利用正则类似将{'name':'ccy','age':18,'info':['address':'wuhan','interest':'playCards']}
                 *---> \r\n{\r\n'name':'ccy',\r\n'age':18,\r\n
                 *'info':\r\n[\r\n'address':'wuhan',\r\n'interest':'playCards'\r\n]\r\n}\r\n
                 */
                json = json.replace(/([\[\]])/g, '\r\n$1\r\n')
                    .replace(/([\{\}])/g, '\r\n$1\r\n')
                    .replace(/(\,)/g, '$1\r\n')
                    .replace(/(\r\n\r\n)/g, '\r\n')
                    .replace(/\r\n\,/g, ',');
                /**
                 * 根据split生成数据进行遍历，一行行判断是否增减PADDING
                 */
                (json.split('\r\n')).forEach(function (node, index) {
                    var indent = 0,
                        padding = '';
                    if (node.match(/\{$/) || node.match(/\[$/)) indent = 1;
                    else if (node.match(/\}/) || node.match(/\]/))  padIdx = padIdx !== 0 ? --padIdx : padIdx;
                    else    indent = 0;
                    for (var i = 0; i < padIdx; i++)    padding += PADDING;
                    formatted += padding + node + '\r\n';
                    padIdx += indent;
                });
                return formatted;
            };

            $("#content").html('');
            $("#header").html('');
            $.ajax({
                url: data.field.url,
                type: 'post',
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                data: _data,
                dataType: 'json',
                success: function(res,textStatus, request){

                    var _content = formatJson(res)

                    var response = [], resHtml = '';
                    response.push({'cache-control': request.getResponseHeader('Cache-Control')})
                    response.push({'Content-Type': request.getResponseHeader('Content-Type')})
                    response.push({'Date': request.getResponseHeader('Date')})
                    response.push({'Host': request.getResponseHeader('Host')})
                    response.push({'X-Powered-By': request.getResponseHeader('X-Powered-By')})
                    response.push({'X-RateLimit-Limit': request.getResponseHeader('X-RateLimit-Limit')})
                    response.push({'X-RateLimit-Remaining': request.getResponseHeader('X-RateLimit-Remaining')})

                    $.each(response, function(i, n){
                        resHtml += _.keys(n)[0]+'：'+ n[_.keys(n)[0]]+'<br/>';
                    })

                    $("#content").html(_content)
                    $("#header").html(resHtml)

                    layui.code();
                }
            })
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });


        //…
    });
</script>