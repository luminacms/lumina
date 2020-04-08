

    <script src="https://printjs-4de6.kxcdn.com/print.min.js"></script>

    <div id="print_box">

<style type="text/css">
    body,td {font-size:13px;}
</style>

<h1 align="center">订单信息</h1>
<table width="100%" cellpadding="1">
    <tr>
        <td width="8%">购 货 人：</td>
        <td>ecshop<!-- 购货人姓名 --></td>
        <td align="right">下单时间：</td><td>2016-05-11 10:11:09<!-- 下订单时间 --></td>
        <td align="right">支付方式：</td><td>银行汇款/转帐<!-- 支付方式 --></td>
        <td align="right">订单编号：</td><td>2016051183359<!-- 订单号 --></td>
    </tr>
    <tr>
        <td>付款时间：</td><td>2016-05-11 10:11:27</td><!-- 付款时间 -->
        <td align="right">发货时间：</td><td>2016-05-11 10:11:49<!-- 发货时间 --></td>
        <td align="right">配送方式：</td><td>申通快递<!-- 配送方式 --></td>
        <td align="right">发货单号：</td><td>600075869 <!-- 发货单号 --></td>
    </tr>
    <tr>
        <td>收货地址：</td>
        <td colspan="7">
            [中国  北京  阳泉市  邱县]&nbsp;海兴大厦&nbsp;<!-- 收货人地址 -->
            收货人：刘先生&nbsp;<!-- 收货人姓名 -->
            <!-- 邮政编码 -->
            电话：010-25851234&nbsp; <!-- 联系电话 -->
            手机：13986765412<!-- 手机号码 -->
        </td>
    </tr>
</table>
<table width="100%" border="1" style="border-collapse:collapse;border-color:#000;">
    <tr align="center">
        <td bgcolor="#cccccc">商品名称  <!-- 商品名称 --></td>
        <td bgcolor="#cccccc">货号    <!-- 商品货号 --></td>
        <td bgcolor="#cccccc">属性  <!-- 商品属性 --></td>
        <td bgcolor="#cccccc">价格 <!-- 商品单价 --></td>
        <td bgcolor="#cccccc">数量<!-- 商品数量 --></td>
        <td bgcolor="#cccccc">小计    <!-- 价格小计 --></td>
    </tr>
    <!--  -->
    <tr>
        <td>&nbsp;自拍杆<!-- 商品名称 -->
        </td>
        <td>&nbsp;ECS000063 <!-- 商品货号 --></td>
        <td><!-- 商品属性 -->
            <!--  -->
            <!--  -->
            <!--  -->
        </td>
        <td align="right">￥46.55元&nbsp;<!-- 商品单价 --></td>
        <td align="right">1&nbsp;<!-- 商品数量 --></td>
        <td align="right">￥46.55元&nbsp;<!-- 商品金额小计 --></td>
    </tr>
    <!--  -->
    <tr>
        <!-- 发票抬头和发票内容 -->
        <td colspan="4">
        </td>
        <!-- 商品总金额 -->
        <td colspan="2" align="right">商品总金额：￥46.55元</td>
    </tr>
</table>
<table width="100%" border="0">
    <tr align="right">
        <td>                        <!-- 配送费用 -->
            + 配送费用：￥15.00元                        <!-- 订单总金额 -->
            = 订单总金额：￥61.55元        </td>
    </tr>
    <tr align="right">
        <td>
            <!-- 如果已付了部分款项, 减去已付款金额 -->
            - 已付款金额：￥61.55元
            <!-- 如果使用了余额支付, 减去已使用的余额 -->

            <!-- 如果使用了积分支付, 减去已使用的积分 -->

            <!-- 如果使用了红包支付, 减去已使用的红包 -->

            <!-- 应付款金额 -->
            = 应付款金额：￥0.00元        </td>
    </tr>
</table>
<table width="100%" border="0">
    <tr align="left"><!-- 订单操作员以及订单打印的日期 -->
        <td>打印时间：2019-05-13 04:25:07&nbsp;&nbsp;&nbsp;操作者：admin</td>
    </tr>
</table>

    </div>

<a href="javascript:;" onclick="printJS('print_box', 'html')">打印</a>

<script>
    $("#j_print").click(function(){
        var printWin = window.open('打印窗口', '_blank'),
            style = ['<style>', 'body{font-size: 12px; color: #666;}', 'table{width: 100%; border-collapse: collapse; border-spacing: 0;}', 'th,td{line-height: 20px; padding: 9px 15px; border: 1px solid #ccc; text-align: left; font-size: 12px; color: #666;}', 'a{color: #666; text-decoration:none;}', '*.layui-hide{display: none}', '</style>'].join(''),
            html = $("#print_box").html();

        printWin.document.write(style + html);
        // printWin.document.close();
        // printWin.print();
        // printWin.close();

    })
</script>
