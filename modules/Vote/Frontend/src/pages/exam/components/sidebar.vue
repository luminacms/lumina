<template>
    <div class="editor_sidebar">
        <div class="tab">
            <a class="tab_item current" href="javascript:;" data-tab="question_type">题目控件</a>
            <a class="tab_item" href="javascript:;" data-tab="survey_outline">问卷大纲</a>
        </div>
        <div id="menu" class="tab_content question_type">
            <ul v-for="(item,index) in components" v-on:mousedown="start" v-bind:data-index="index" v-bind:data-type="item.type">
                <li class="type_item" :class="item.type"> <a href="javascript:;"><span class="ico"><i :class="item.icon"></i></span>{{ item.title }}</a> </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'mainleft',
        props: ['components'],
        methods: {
            start: function (e) {
                let obj = {}
                let dom = e.currentTarget
                let index = dom.getAttribute('data-index')
                let actualLeft = dom.offsetLeft;
                let current = dom.offsetParent;
                let actualTop = dom.offsetTop;
                while (current !== null) {
                    actualLeft += current.offsetLeft;
                    actualTop += current.offsetTop;
                    current = current.offsetParent;
                }
                let _component = this.components[index]
                obj.type = _component.type
                obj.componentText = _component.name
                obj.componentIcon = _component.icon
                obj.clientX = e.clientX
                obj.clientY = e.clientY
                obj.isstart = true
                obj.componentView = _component
                drag.$emit("movestart", obj)
            }
        }
    }
</script>