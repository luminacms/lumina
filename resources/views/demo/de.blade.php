@extends('core::layouts.blank')

@section('content')
<div class="am-form-group">
    <label class="am-u-sm-3 am-u-lg-2 am-form-label form-require">
        配送区域及运费
    </label>
    <div class="am-u-sm-9 am-u-lg-10 am-u-end">
        <div class=" am-scrollable-horizontal">
            <table class="regional-table am-table am-table-bordered
             am-table-centered am-margin-bottom-xs">
                <tbody>
                    <tr>
                        <th width="42%">可配送区域</th>
                        <th>
                            <span class="first">首件 (个)</span>
                        </th>
                        <th>运费 (元)</th>
                        <th>
                            <span class="additional">续件 (个)</span>
                        </th>
                        <th>续费 (元)</th>
                    </tr>
                    <tr>
                        <td colspan="5" class="am-text-left">
                            <a class="add-region am-btn am-btn-default am-btn-xs" href="javascript:;">
                                <i class="iconfont icon-dingwei"></i>
                                点击添加可配送区域和运费
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>


    <div class="regional-choice"></div>
    <script src="/delivery.js"></script>
    <script>
        $(function () {

            // 初始化区域选择界面
            var datas = '';

            // 配送区域表格
            new Delivery({
                table: '.regional-table',
                regional: '.regional-choice',
                datas: datas
            });

            /**
             * 表单验证提交
             * @type {*}
             */
            // $('#my-form').superForm();

        });

    </script>
    @endsection
