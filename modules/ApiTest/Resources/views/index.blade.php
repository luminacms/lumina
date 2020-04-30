<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ApiTest接口调试插件</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="{{ asset('assets/apitest/apitest.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="https://cdn.xaweiju.com/libs/bootstrap/3.2.0/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="https://cdn.xaweiju.com/libs/jquery/jquery-ui/jquery-ui.min.css" rel="stylesheet" type="text/css" />
    <link href="https://cdn.xaweiju.com/libs/jquery/jsonview/jquery.jsonview.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css">

    <script src="https://cdn.xaweiju.com/libs/jquery/jquery.min.js"></script>
    <script src="https://cdn.xaweiju.com/libs/bootstrap/3.2.0/bootstrap.min.js"></script>
    <script>$.ajaxSetup({headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}});</script>
</head>
<body>
<input id="id-page-name" type="hidden" value="debug">
<div class="h40 CFFF pl20 w shadow fixed z10" style="background:#233050;">
    <button class="btn btn-menu btn-sm fl mr10 mt5 cursor ml20" id="left-enlarge">
        Left &nbsp;<div class="fr mt-1"><i class="fa fa-angle-left"></i></div>
    </button>

</div>

<div class="w h pt40 fixed min-w900" id="content">

    <!-- *****************************left************************************ -->
    <div id="left" class="BGEEE h m0 fl p0 shadow ofy-a" style="width:18%;">
        <!--接口请求头、参数等切换标签-->
        <div class="bb1 h40 mt40 f12 C555 pt10">
            <div class="bb3 fl w-50 tc h30 cursor" id="modules-title" title="Module">Collections</div>
            <div class="fl w-50 tc h30 cursor" id="historys-title" title="History">History</div>
        </div>
        <!--历史记录 -->
        <div id="historys" class="none w"></div>
        <!--模块-->
        <div id="modules" class="w panel-group mb0" role="tablist"></div>
    </div>
    <!-- ****************************left end*********************************** -->

    <div id="right" class="BGF5 h m0 fr p0 ofy-s fl"  style="width:82%;">

        <!--顶部空白-->
        <div class="BGF9 h40 w"></div>
        <!--标签
        <div class="w h32 bb1 BGF9 f12 lh30">
            <div class="fl ml10 pl10 pr20 C555 top-radius h32 w150 b1 bb0 rel BGF5  of-h">
                    <i class="iconfont CAAA f12 abs pos-t5 pos-r5 cursor" onclick="closeMyDialog('myDialog')">&#xe615;</i>
                    选人新接口

            </div>
            <div class="fl ml10 pl10 pr20 CAAA top-radius h32 w150 b1 bb0 rel BGF9 of-h mt-1">
                    <i class="iconfont CAAA f12 abs pos-t5 pos-r5 cursor" onclick="closeMyDialog('myDialog')">&#xe615;</i>
                    人新接口
            </div>
        </div>-->
        <div class="cb"></div>

        <!--参数、头、相应结果-->
        <div class="w h mt10 rel">
            <!--接口标题-->
            <div class="mt10 ml10 fb bl3 f14 pl10 tl pr10">
                <input type="text" class="form-control b0 r2 BGF5 p3 h27" id="interface-name" placeholder="Click input interface name"/>
                <input type="hidden" class="form-control b0 r2 BGF5 p3 h27" id="interface-id" value="-1"/>
                <input type="hidden" class="form-control b0 r2 BGF5 p3 h27" id="module-id" value="-1"/>
            </div>
            <!--接口URL-->
            <table class="w mt10">
                <tr>
                    <td class="w120 pr10 pl10">
                        <select class="form-control" id="method">
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                        </select>
                    </td>
                    <td class="pr10">
                        <div class="input-group">
                            <input type="text" class="form-control" id="url" placeholder="Enter request URL">
                            <span class="input-group-addon cursor btn-main" id="send"><i class="fa fa-paper-plane"></i> Send</span>
                        </div>
                    </td>
                    <td class="tr w100">
                        <div class="btn-group w">
                            <button type="button" class="btn btn-main" id="save-interface">Save</button>
                            <button type="button" class="btn btn-main dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="caret"></span>
                                <span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <ul class="dropdown-menu min-w80">
                                <li><a id="save-as-interface" class="pl10 pr10 cursor">Save As</a></li>
                                <!--<li><a href="#" class="pl10 pr10">Another</a></li>
                                <li><a href="#" class="pl10 pr10">Something</a></li>
                                <li role="separator" class="divider pl10 pr10"></li>
                                <li><a href="#" class="pl10 pr10">Separated</a></li>-->
                            </ul>
                        </div>
                    </td>
                </tr>
            </table>

            <!--接口请求头、参数等切换标签-->
            <div class="h30 mt10 shadow-b pl10 C555">
                <div class="params-title menu-title" data-stage="headers-div">Headers</div>
                <div class="params-title menu-title bb3" data-stage="params-div">Params</div>
            </div>

            <!--请求头-->
            <div class="p10 bt1 bb1 none" id="headers-div">
                <table class="params-headers-table f12 w"  id="headers-table">
                    <thead>
                    <tr class="fb">
                        <td class="p5" style="width:30%">
                            Key
                        </td>
                        <td class="p5" colspan="2">
                            Value
                            <a class="bulk-edit fr mr20 color-main cursor" crap-data-value="headers">Bulk Edit</a>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="last">
                        <td>
                            <input type="text" class="form-control" data-stage="key">
                        </td>
                        <td>
                            <input type="text" class="form-control" data-stage="value">
                        </td>
                        <td class="w20"><i class="fa fa-trash"></i></td>
                    </tr>
                    </tbody>
                </table>

                <div id="headers-bulk-edit-div" class=" f12 none">
                    <a class="key-value-edit fr  mr20 color-main cursor fb" crap-data-value="headers">Key-Value Edit</a>
                    <textarea id="headers-bulk" class="form-control w BGFFF min-h100 max-w" placeholder="key:value"></textarea>
                </div>
            </div>
            <!--请求头-->

            <!--参数-->
            <div class="bb1" id="params-div">
                <div id="content-type" class="f12 p10 C999 pl20 none">
                    <div class="fl">
                        <input type="radio" name="param-type" checked  id="param-type-value"  value="application/x-www-form-urlencoded;charset=UTF-8"> x-www-form-urlencoded;charset=UTF-8&nbsp;&nbsp;&nbsp;
                    </div>
                    <div class="fl">
                        <input type="radio" name="param-type" crap-data="customer" id="customer-type-value" value="application/json"> customer&nbsp;&nbsp;&nbsp;
                    </div>
                    <select class="form-control none w150 fl table-input" id="customer-type">
                        <option value="application/json">application/json</option>
                        <option value="text/plain">text/plain</option>
                        <option value="application/xml">application/xml</option>

                    </select>
                    <div class="cb"></div>

                </div>

                <div class="bt1 p10">
                    <table class="params-headers-table f12 w" id="params-table">
                        <thead>
                        <tr class="fb">
                            <td class="p5" style="width:30%">
                                Key
                            </td>
                            <td class="p5" colspan="2">
                                Value
                                <a class="bulk-edit fr mr20 color-main cursor" crap-data-value="params">Bulk Edit</a>
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="last">
                            <td>
                                <input type="text" class="form-control" data-stage="key">
                            </td>
                            <td>
                                <input type="text" class="form-control" data-stage="value">
                            </td>
                            <td class="w20"><i class="fa fa-trash"></i></td>
                        </tr>
                        </tbody>
                    </table>

                    <div id="customer-div" class=" f12 none">
                        <textarea id="customer-value" class="form-control w BGFFF min-h100 max-w" placeholder=""></textarea>
                    </div>

                    <div id="params-bulk-edit-div" class=" f12 none">
                        <a class="key-value-edit fr  mr20 color-main cursor fb" crap-data-value="params">Key-Value Edit</a>
                        <textarea id="params-bulk" class="form-control w BGFFF min-h100 max-w" placeholder="key:value"></textarea>
                    </div>
                </div>
            </div>
            <!--参数：end-->

            <!--response-->
            <!--response-title-->
            <div class="bb1 h30 mt10 shadow-b pl10 C555 mb10">
                <div class="mt10 f14 tl w">
                    <div class="response-title menu-title bb3" data-stage="response-body">Body</div>
                    <div class="response-title menu-title" data-stage="response-header">Headers</div>
                    <div class="response-title menu-title" data-stage="response-cookie">Cookie</div>
                    <div class="cb"></div>
                </div>
            </div>

            <!--response-menu-->
            <div class="response-body p10 pb0 pt0">
                <div class="btn-group" role="group">
                    <button type="button" class="response-menu btn btn-default btn-xs" id="format-row">Row</button>
                    <button type="button" class="response-menu btn btn-default btn-xs" id="format-pretty">Pretty</button>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;Json:
                <div class="btn-group" role="group">
                    <button type="button" class="response-menu response-json btn btn-default btn-xs" id="json-expand" crap-data-name="expand" crap-data-value="1">Expand</button>
                    <button type="button" class="response-menu response-json btn btn-default btn-xs" crap-data-name="collapse" crap-data-value="1">Collapse</button>
                    <button type="button" class="response-menu response-json btn btn-default btn-xs" crap-data-name="collapse" crap-data-value="2">Collapse2</button>
                    <button type="button" class="response-menu response-json btn btn-default btn-xs" crap-data-name="collapse" crap-data-value="3">Collapse3</button>
                    <button type="button" class="response-menu response-json btn btn-default btn-xs" crap-data-name="collapse" crap-data-value="4">Collapse4</button>
                    <button type="button" class="response-menu response-json btn btn-default btn-xs" crap-data-name="nl2br" crap-data-value="true">Nl2br</button>
                </div>
            </div>
            <!--response-menu:end-->

            <div class="p10 ofy-s min-h400">

                <div class="response-body">
                    <!--row-->
                    <textarea id="response-row" class="form-control w h BGFFF min-h400 hidden" placeholder="Hit the Send buttom to get a response"></textarea>

                    <!--pretty-->
                    <div id="response-pretty" class="b1 r5 p10 BGFFF min-h400">
                        <div class="tc mt100 C999"><i class="fa fa-send"></i>Hit the Send button to get a response</div>
                        <div class="tc C999">
                            <a class="cursor C999" target="_blank" href="javascript:;">help?</a>
                        </div>
                    </div>
                </div>

                <!--header-->
                <div class="response-header b1 r5 p10 min-h400 none BGFFF">
                    <div class="fb">General</div>
                    <div class="ml20 general"></div>
                    <div class="fb mt20">Response Headers</div>
                    <div class="ml20 headers"></div>
                </div>

                <!--cookie-->
                <div class="response-cookie b1 r5 p10 min-h400 none BGFFF">
                    <table class="table">

                    </table>

                </div>

            </div>

        </div>
    </div>
</div>

<div id="float" class="folat">
    <div class="sk-wave">
        <div class="sk-rect sk-rect1"></div>
        <div class="sk-rect sk-rect2"></div>
        <div class="sk-rect sk-rect3"></div>
        <div class="sk-rect sk-rect4"></div>
        <div class="sk-rect sk-rect5"></div>
    </div>
</div>
<div class="tip-div" id="tip-div"></div>
<div id="fade" class="folat"></div>
<div id="dialog" class="look-up shadow">
    <div id="dialog-title" class="CFFF f16 shadow dialog-title">
    </div>
    <div id="dialog-content" class="look-up-content b0 f12 tl p30 BGFFF C555">
        <table class="table table-bordered">
            <tr>
                <td>Interface name</td>
                <td>
                    <input class="form-control" id="save-interface-name" placeholder="Click input interface name"/>
                </td>
            </tr>
            <tr>
                <td>Module</td>
                <td>
                    Save to existion module/folder
                    <select class="form-control" id="save-module-id">

                    </select>
                </td>
            </tr>
            <tr>
                <td>Module Name</td>
                <td>
                    Or create new module/folder
                    <input class="form-control" id="save-module-name" placeholder="Click input module name"/>
                </td>
            </tr>

        </table>
        <button type="button" class="btn btn-main fr" id="save-interface-submit">Save</button>

    </div>
    <i class="fa fa-close CFFF fb f16 close-dialog i-close" crap-data="dialog"></i>
</div>
<div id="dialog2" class="look-up shadow">
    <div class="CFFF f16 shadow" style="line-height:40px;padding-left:20px; height:40px; background-color:#233050;">
        Rename module
    </div>
    <div class="look-up-content b0 f12 tl p30 BGFFF C555">
        <table class="table table-bordered">
            <tr>
                <td>Module Name</td>
                <td>
                    <input class="form-control" id="rename-module-id" type="hidden"/>
                    <input class="form-control" id="rename-module-name" placeholder="Click input module name"/>
                </td>
            </tr>

        </table>
        <button type="button" class="btn btn-main fr" id="save-module-submit">Save</button>

    </div>
    <i class="fa fa-close CFFF fb f16 close-dialog" crap-data="dialog2">&#xe615;</i>
</div>

<script src="/assets/apitest/base-dao.js"></script>
<script src="/assets/apitest/crapApi.js"></script>
<script src="/assets/apitest/plug-function.js"></script>
<script src="https://cdn.xaweiju.com/libs/jquery/jsonview/jquery.jsonview.js"></script>
<script type="text/javascript" src="https://cdn.xaweiju.com/libs/jquery/jquery-ui/jquery-ui.min.js"></script>

</body>
</html>
