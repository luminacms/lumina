@extends('core::layouts.full')

@section('content')
    <div id="app"></div>
    <div class="dingflow-design" style="display: block">
        <div class="zoom">
            <a class="zoom__bar zoom-out" data-zoom="in"></a><span>100%</span>
            <a class="zoom__bar zoom-in" data-zoom="out"></a>
        </div>
        <div class="ie-polyfill-container">
            <div class="box-scale" id="box-scale" style="transform: scale(1); transform-origin: 50% 0px 0px;">
                <div class="node-wrap">
                    <div class="node-wrap-box node_sid-startevent start-node">
                        <div>
                            <div class="title" style="background: rgb(87, 106, 149);"><span class="">发起人</span></div>
                            <div class="content">
                                <div class="text">周董</div><i class="anticon anticon-right arrow"></i>
                            </div>
                        </div>
                    </div>
                    <div class="add-node-btn-box">
                        <div class="add-node-btn"><button class="btn j_btn" type="button"><i class="fa fa-plus"></i></button></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection

@push('script')
    <script>
        layui.extend({
            'flowDesign': 'extends/flowDesign/flowDesign'
        }).use('flowDesign', function(){
            var flow = layui.flowDesign;

            flow.render({
                elem: "#box-scale",
                data: {!!   json_encode([
                    ["type" => "approver", "value" =>"1"],
                    ["type" => "cc", "value" =>"2"],
                    ["type" => 'map', "children"=>[
                        ["condition" => "1", "map" => [
                            ["type" => "approver", "value" =>"1"]
                        ]],
                        ["condition" => "2", "map" => [
                            ["type" => "cc", "value" =>"22"],
                            ["type" => "approver", "value" =>"1"],
                            ["type" => "approver", "value" =>"1"]
                        ]],
                        ["condition" => "2", "map" => [
                            ["type" => "cc", "value" =>"22"]
                        ]]
                    ]]
                ]) !!}
            });

            $(document).on("click", ".zoom__bar", function(){
                var _zoom = $(this).data('zoom');
                var _old = $("#box-scale").css('transform');

                var values = _old.split('(')[1].split(')')[0].split(',');
                var a = values[0],b = values[1];
                var scale = Math.sqrt(a * a + b * b);

                if(_zoom == 'in') {
                    scale = scale - 0.1
                }else if(_zoom == 'out') {
                    scale = scale + 0.1
                }
                $("#box-scale").css('transform', 'scale('+scale+')')
            })
        })
    </script>
@endpush
