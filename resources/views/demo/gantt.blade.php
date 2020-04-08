@extends('core::layouts.master')

@section('content')

    <div id="ganttChart" style="overflow: hidden;"></div>

    <link rel="stylesheet" href="https://cdn.sxmgcm.cn/libs/ganttView/jquery.ganttView.css">

    <script src="https://cdn.sxmgcm.cn/libs/ganttView/date.js"></script>
    <script src="https://cdn.sxmgcm.cn/libs/ganttView/jquery.ganttView.js"></script>
    <script>
        var ganttData = [
            {
                'id':1,
                'name': '张三',
                'series': [
                    {'name': '\u767d\u9e7f\u539f\u843d\u5730\u9875\u8bbe\u8ba1', 'id':1, "start":"2019-06-03","end":"2019-06-03","color":"#f4f50d"},
                    {'name': '\u767d\u9e7f\u539f\u843d\u5730\u9875\u8bbe\u8ba1', 'id':2, "start":"2019-06-13","end":"2019-06-14","color":"#f4f50d"},
                    {'name': '\u767d\u9e7f\u539f\u843d\u5730\u9875\u8bbe\u8ba1', 'id':3, "start":"2019-06-23","end":"2019-06-26","color":"#f4f50d"},
                ]
            },
            {
                "id": "0767",
                "name": "\u5b59\u5fd7\u8c6a",
                "series": [
                    {"name": "\u56fd\u7f8e\u5f00\u5c4f\u56fe\u5207\u56fe5\u5f20\u8bbe\u8ba1", "id": "8dd712e6-08c3-4b7b-8b21-6e9491bf2383", "start": "2019-06-03", "end": "2019-06-20", "color": "#e7e8eb"},
                    {"name": "\u65c5\u53d1\u59d4\u843d\u5730\u9875\u8bbe\u8ba1", "id": "8dda9d18-7bc1-4e91-b525-b2835d4c25a0", "start": "2019-06-05", "end": "2019-06-20", "color": "#e7e8eb"},
                    {"name": "\u6e2d\u5357\u4e07\u8fbe\u843d\u5730\u9875\u3001\u5165\u53e3\u56fe\u8bbe\u8ba1", "id": "8de68dc7-51b6-4197-9597-38a38dd09788", "start": "2019-06-11", "end": "2019-06-20", "color": "#e7e8eb"},
                    {"name": "\u6c11\u4e50\u56ed\u4e07\u8fbe\u843d\u5730\u9875\u53ca\u5165\u53e3\u56fe\u8bbe\u8ba1", "id": "8de8984f-1c46-451f-8751-eac23c174320", "start": "2019-06-12", "end": "2019-06-20", "color": "#e7e8eb"},
                    {"name": "\u54b8\u9633\u4e07\u8fbe\u843d\u5730\u9875\u3001\u5165\u53e3\u56fe\u8bbe\u8ba1", "id": "8de898bc-b1ca-4fd3-b903-e80980ad8365", "start": "2019-06-12", "end": "2019-06-20", "color": "#e7e8eb"},
                    {"name": "\u9ad8\u65b0\u533a\u4e13\u9898\u642d\u5efa", "id": "8de8af0c-5519-4ca5-b9d9-085c7f3135b5", "start": "2019-06-13", "end": "2019-06-20", "color": "#e7e8eb"},
                ]
            }
        ];
        $("#ganttChart").ganttView({
            data: ganttData,
            slideWidth: innerWidth-600,
            slideHeight: innerHeight-250,
            behavior: {
                onClick: function (data) {
                    (new $.zui.ModalTrigger({
                        'type': 'ajax',
                        'position': 'fixed',
                        'size': 'lg',
                        'url' : '/workorders/'+data.id
                    })).show();
                }
            }
        });
    </script>
@endsection
