<template>
    <div class="wf-panel wf-settingpanel">
        <div class="tab">
            <a class="tab_item" href="javascript:;" data-tab="question_type" v-bind:class="[component?'current':'']">控件设置</a>
        </div>
        <widgetsettings v-show="component"></widgetsettings>
    </div>

</template>
<script type="text/ecmascript-6">
    import widgetsettings from "./widgetsettings"

    export default{
        name: 'setting',
        data(){
            return {
                component: false
            }
        },
        components: {
            widgetsettings
        },
        methods: {
            clickTab: function (e) {
                if (e.currentTarget.getAttribute('data-tabName') === 'component') {
                    this.component = true
                } else {
                    this.component = false
                }
            }
        },
        created: function () {
            let self = this
            drag.$on("changeTab", function (bool) {
                self.component = bool
            })
           /* drag.$on("selectComponent", function (obj) {
                self.supportSetting = Object.assign({}, self.supportSetting, obj)
                console.log(self.supportSetting)
            })*/
        }
    }
</script>
