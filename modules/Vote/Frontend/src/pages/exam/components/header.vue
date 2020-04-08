<template>
    <div class="g_subheader">
        <div class="g_content">
            <div class="sub_nav">
                <a class="nav_item current" href="javascript:;" id="sidebar_normal">编辑</a>
                <!--<a class="nav_item " href="javascript:;" id="sidebar_theme">主题</a>-->
                <a class="nav_item" id="skin_link" href="/skin.html?sid=4010271">皮肤</a>
                <a class="nav_item" id="setting_link" href="/setting.html?sid=4010271">设置</a>
                <a class="nav_item" id="deliver_link" href="/deliver.html?sid=4010271">投放</a>
                                                                                                                                                                                                                                          href="/stat/overview.html?sid=4010271">统计</a> </div>
                <div class="survey_options published" style="display: block;">
                    <a href="/author_print.html?id=4010271" id="print_survey" target="_blank"> <i class="ico ico_print"></i> 打印</a>
                    <a href="javascript:;" id="switch_to_text_mode" class=""> <i class="ico ico_advanced_mode"></i> 文本编辑</a>
                    <a href="javascript:;" id="preview_survey" @click="save"> <i class="ico ico_preview"></i>保存</a>
                    <a href="javascript:;" id="publish_survey" class="btn btn_middle btn_blue btn_start"><i></i>开始回收</a>
                    <a href="javascript:;" id="close_survey" class="btn btn_middle btn_blue btn_close"><i></i>暂停回收</a>
                </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['save']
    }
</script>