@extends('core::layouts.blank')

@push('style')
    <style>
        .g-doc{padding:20px;background-color: #fff;margin: 20px 16px;width: 76%}
        .g-doc pre{position: relative;margin: 10px 0;padding: 15px;line-height: 20px;border: 1px solid #ddd;border-left-width: 6px;background-color: #f2f2f2;color: #333;font-family: Courier New;font-size: 12px;}
        .g-doc .box{margin-left: 250px;border-left: 1px solid #ccc;padding-left: 25px;padding-bottom: 60px;}
        .g-doc .box a{margin: 0 10px;}
        .g-doc .box h1{font-size: 1.5rem;padding-top: .75rem;padding-bottom: .75rem;margin-bottom: 2rem;font-weight: 700;border-bottom-width: 1px;}
        .g-doc .box h2{font-size: 1.2rem;font-weight: 600;border-bottom: 1px solid #ccc;padding: 10px 0;margin: 15px 0 10px;}
        .g-doc .box h3{padding: .5rem 0;font-weight: 600;}
        .g-doc .index-1{font-weight: 900;}
        .g-doc .index-2{padding-left: 20px;}
        .g-doc .index-3{padding-left: 40px;}
        .g-doc table{border:1px solid #ccc;width: auto;}
        .g-doc table thead{background-color: #f2f2f2;}
        .g-doc table tr td,.g-doc table tr th{border:1px solid #ccc;padding: 9px 15px;min-height: 20px;line-height: 20px;}
        .g-doc table tr:hover{background-color: #f2f2f2;}
        .http-method .default{width: 70px;display: inline-block;background-color: #333333;-webkit-border-radius: 3px;border-radius: 3px;vertical-align: middle;margin-bottom: 3px;margin-right: 15px;color: #FFF !important;font-size: 11px;height: 24px;line-height: 24px;text-transform: uppercase;text-align: center;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}
        .http-method .post{background-color: #F47023 !important;}
        .http-method .get{background-color:#27AE60 !important;}
        .http-method .put{background-color:#4A90E2!important;}
        .http-method .del{background-color:red!important;}
        .http-method .trace{background-color:#e09d43 !important;}
        .g-doc a{text-decoration: underline;}
        .g-doc blockquote{margin-left: 0;margin-right: 0;padding: 0 15px;color: #777;border-left: 4px solid #ddd;}
    </style>
@endpush
@section('content')

    <div class="g-doc">
        <div style="width: 250px;" class="fixed">
            <ul id="menu"></ul>
        </div>
        <div class="box" id="content">
            {!! $html !!}
        </div>
    </div>

@endsection

@push('script')
<script>
    $(function() {
        $("#content").children().each(function (idx, element) {
            var tagName = $(this).get(0).tagName;
            if (tagName.substr(0, 1).toUpperCase() == "H") {
                var index = tagName.substr(1, 1);
                if(index < 4){
                    var contentH = ($(this).html()).substr(0, 15);//获取内容
                    var markid = "mark-" + tagName + "-" + idx.toString();
                    $(this).attr("id", markid);
                    $("#menu").append("<li class='index-"+index+"'><a href='#" + markid + "' class='block p-2 hover:underline'>" + contentH + "</a></li>");
                }
            }
        });
    })
</script>
@endpush
