layui.define(['table'], function(exports){
    var $ = layui.jquery,
        table = layui.table,
        layer = layui.layer;

    var picker_modal = '',
        options = {};
    var pickerUser = {
        init: function(){
            var self = this
            $("*[lay-picker-user]").each(function(){
                var $self = $(this)
                $self.prop('readonly', true).addClass('hand')
                $self.on("click", function(){
                    self.handUserPicker(self)
                })
            })
        },
        close: function(){
            layer.close(picker_modal)
        },
        render:function(_option){
            options = $.extend(options, _option)

            var api_user = '/interface/users';
            var self = this;
            picker_modal = layer.open({
                type: 1,
                title: '员工选择器',
                btn: ['选择', '取消'],
                area: ['800px', '500px'],
                content: '<div class="layui-card"><div class="layui-card-body"><table id="picker_user_table" lay-filter="picker_user_table"></table></div></div>',
                yes: function(index){
                    var _checked = table.checkStatus('picker_user_table');
                    typeof options.done === 'function' && options.done(_checked.data, picker_modal);
                },
                no: function(){
                    layer.close(picker_modal)
                },
                success: function(){
                    table.render({
                        elem: '#picker_user_table',
                        url: api_user,
                        size: 'sm',
                        width: '500px',
                        height: '350px',
                        page: true,
                        toolbar: true,
                        defaultToolbar: ['filter'],
                        autoSort: false,
                        cellMinWidth: 80,
                        cols: [[
                            {type: 'checkbox', fixed: 'left'},
                            {field:'id', width:80, title: 'ID', sort: true, fixed: 'left',templet: '#table_id_tpl'},
                            {field:'name', width: 200,title: '姓名'},
                            {field:'email', width: 200, title: '邮箱'},
                            {field: 'created_at', width: 150, fixed: 'right',title:'创建时间'},
                        ]]
                    })
                    table.on('row(picker_user_table)', function(obj){
                        console.log(obj)
                    })
                    table.on('sort(picker_user_table)', function(obj){
                        //尽管我们的 table 自带排序功能，但并没有请求服务端。
                        //有些时候，你可能需要根据当前排序的字段，重新向服务端发送请求，从而实现服务端排序，如：
                        table.reload('picker_user_table', {
                            initSort: obj,
                            where: { //请求参数（注意：这里面的参数可任意定义，并非下面固定的格式）
                                orderBy: obj.field,
                                sortedBy: obj.type //排序方式
                            }
                        });
                    });
                    table.on('toolbar(picker_user_table)', function(obj){
                        var _word = '';
                        if(obj.event == 'search'){
                            _word = $("#picker_user_search").val();
                            table.reload('picker_user_table', {
                                url: api_user,
                                where: {search: _word, searchFields: 'name:like;email:='},
                                page: {curr: 1}
                            })
                        }
                    });
                }
            })
        }
    };

    exports('pickerUser', pickerUser);
});
