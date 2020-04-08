<template>
    <div class="fd-nav">
        <div class="fd-nav-left">
            <div class="fd-nav-back"><i class="anticon anticon-left"></i></div>
            <div class="fd-nav-title">开发测试</div>
        </div>
        <div class="fd-nav-center">
            <div class="fd-nav-container">
                <div class="ghost-bar" style="transform: translateX(150px);"></div>
                <div class="fd-nav-item"><span class="order-num">1</span>基础设置</div>
                <div class="fd-nav-item active"><span class="order-num">2</span>表单设计</div>
                <div class="fd-nav-item"><span class="order-num">3</span>流程设计</div>
                <div class="fd-nav-item"><span class="order-num">4</span>高级设置</div>
            </div>
        </div>
        <div class="fd-nav-right">
            <button type="button" class="ant-btn button-preview" data-spm-anchor-id="0.0.0.i6.38484490ZGSBAd">
                <span>预 览</span></button>
            <button type="button" class="ant-btn button-publish"><span>发 布</span></button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'TopHeader'
    }
</script>
