<template>
    <div class="wf-panel wf-widgetspanel">
        <div class="wf-panel-tab">
            <a href="javascript:;" class="tabitem current">控件</a>
        </div>
        <div class="wf-panel-body">
            <div v-for="(item,index) in components"
                 class="wf-widgetsitem" v-bind:data-index="index" v-bind:data-type="item.componentName"
                 v-on:mousedown="start">
                <label>
                    {{item.name}}
                </label>
                <img class="widgeticon" :src="item.icon" v-if="item.icon">
            </div>

        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'mainleft',
        data(){
            return {
                components: [
                    {
                        name: '单行输入框',
                        defaultLable: '单行输入框',
                        defaultProps: '请输入',
                        defaultImportant: false,
                        defaultPrint: false,
                        componentName: 'textfield',
                        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAG1BMVEVHcEwZHiYZHiUaHyMdKCgZHiYaISQYHiQZHiYtE7tIAAAACXRSTlMAZVUSCTQmQxxVUCeiAAAA7ElEQVQoz9WSTW7CQAxGTQIlSz6XDFumvUBSUYklpTkAkXqAgkTXmS5YE1Gp167HM8micwK+ReK8/DzbCtG9Z4oyhTMghRnwmcDeoEugW7jH1NP10bS97SJ8wDVjvdsCfI0eFr+vXyAxAdYl5Wqy5SZ3HD1isUuiAgeiOcJXsSZqSz9DFQ/eI52/8ThIFU6bptmrid7PNsAaGjHl375Q2AYoJoeny2uAMF8SZ8TxPIiKsIyeaQIa4HzQVfVqvIzNzNBpdVTYhgXlWGT4mP5Ce/MD+lhT6D7Ao0feYDoBq53lf+ve3uSpn7v5C/8Auc4hwIODgzAAAAAASUVORK5CYII=',
                        supportSetting: ['label', 'placeholder', 'required', 'important', 'print']
                    },
                    {
                        name: '多行输入框',
                        defaultLable: '多行输入框',
                        defaultProps: '请输入',
                        defaultImportant: false,
                        defaultPrint: false,
                        componentName: 'textareafield',
                        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAGFBMVEUZHiVHcEwYHCYZHiQaHiYdHSEaHSQhLS17jR+UAAAACHRSTlNmADVSJRNDB3u7OmgAAACUSURBVCjPYxDEAhioICjC4IgpKMaQiClYYMyOKejgxIIpaFDKDCQVGMCACSIoyiZoEAhkQgFEUIhFUEERXaUwu2CAIbqZAYmCwqzogglmaclsaILiUONRBEXYQkNDDRxRBcVALndIRLW9gBHkU3ZUd4LcKCjMhKoS5BtBEWYqRwcWQQUGFACxnQEN4FZJm2QzVN0JAJnJMuKEusQeAAAAAElFTkSuQmCC',
                        supportSetting: ['label', 'placeholder', 'required', 'important', 'print']
                    },
                    {
                        name: '数字输入框',
                        defaultLable: '数字输入框',
                        defaultProps: '请输入',
                        defaultImportant: false,
                        defaultPrint: false,
                        componentName: 'numberfield',
                        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAG1BMVEUZHiVHcEweHyYZHScZHiUYHiUhKSkZHiMZHyeFN1kHAAAACXRSTlNlABArT1wIPxx2kW44AAAA40lEQVQoz92Su2+CUBTGv8jL9QOLjEB0xxrDitWhI6HRWdKk6Ui7dJWlf7fnXKDYtIm7Zzjn3l++87gP8B/DXUA/GYPAxUEWC+CTJjwrDIBEHdB2YUWEhSMwdtpXHBnbbVROiBnWApsJmU2ZueTZIh6eAoHFljxZzFcmIKDCt5qMLdP/PNXuCtUa18wkSSOM8EGG+8Krr2Bsqw7YXUG/PIoP1zmqES6drrJmDNAvq/4S5qgH2Am/WrPtYS/UM8x+lEs8pmnKzEv8xhtqFno9jqjEtr+gDLoBXv4+x/v33fylm/ACBXhC6aliFlMAAAAASUVORK5CYII=',
                        supportSetting: ['label', 'placeholder', 'required', 'important', 'print', 'uint']
                    },
                    {
                        name: '单选框',
                        defaultLable: '单选框',
                        defaultProps: '请选择',
                        defaultImportant: false,
                        defaultSync: false,
                        defaultPrint: false,
                        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAHlBMVEUYHiZHcEwnMTEZHSMbHiUZHyYbGyUYHCUZGyUaGiTzZ3XQAAAACnRSTlNmAAZQK10fRDcO712dBgAAAPJJREFUKM+Nk0EPwUAQhV9UqaNVxM0GcS0nbiXhXOIHkEjEDQfnJv4Akfi9dqctjTxiLrv92t15M/OKKgn8hOqx1x9Q7SLAPes8VDEkPJ2DM2A0316A1Rv24U7t2o1wyqAK3ElymR85OoUdjLO8dwxTeCi/xKhDOYG+vE2jg4nAnnt7w1a0FBgX8yWGnoUKizysQxvYgOjxAydZsTGwCS1aAdGocDSw7tgParb0gd0FCwPbntxvoWSMCwZeZRtYKGfCioHrkvRAwu7M8xdIj9NEVBIVT8ukDaGt402m46CD4yOmZqC24QbjVqSm5fb+4+94AgpfSS+2ESzdAAAAAElFTkSuQmCC',
                        defaultOptions: [
                            {idx: 1, text: '选项1'},
                            {idx: 2, 'text': '选项2'},
                            {idx: 3, text: '选项3'}
                        ],
                        componentName: 'ddselectfield',
                        supportSetting: ['label', 'placeholder', 'options', 'sync', 'required', 'important', 'print']
                    },
                    {
                        name: '多选框',
                        defaultLable: '多选框',
                        defaultProps: '请选择',
                        defaultImportant: false,
                        defaultPrint: false,
                        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAG1BMVEUZHiZHcEwYHCgYHiUZHSYZHiUfIyolJSUXHCUVEW/fAAAACXRSTlNlAB1dNyUQBkxicou6AAAA+klEQVQoz52TvRKCMAyAI9WTFeRnhfP0HNHBuQzu6jm4Vl5A3oDF9zZNglUvi3YBPr6QNA2QKAt+h8Xq7L5geQVcj/4dlhZoTfs3uARzWN8uDewCzCCu/TUdoH1Ba078sbyZjjCD/Zi3I9XDyvQjLJuIYdnsQ92dF8BHnwLMfTzCexxY1Q5zgsfoxVKYVDOCwzaIUC9iglwwixFm8LAIeVDETA5hincbN4r0CPSKK/UiBTK0xoko0Pu0exIlnBKhyqIkopJQZVFK4uKtYTGR4mmbGbCYyDa5IVY6IA3h1uXuo3Vqk9Xj0A9OPWJ9GNSx0QdMHUV9aP/9EZ69VkfnYpHYCAAAAABJRU5ErkJggg==',
                        defaultOptions: [
                            {idx: 1, text: '选项1'},
                            {idx: 2, 'text': '选项2'},
                            {idx: 3, text: '选项3'}
                        ],
                        componentName: 'ddmultiselectfield',
                        supportSetting: ['label', 'placeholder', 'options', 'required', 'important', 'print']
                    },
                    {
                        name: '日期',
                        defaultLable: '日期',
                        defaultProps: '请选择',
                        defaultImportant: false,
                        defaultPrint: false,
                        defaultFormat: 'yyyy-MM-dd',
                        componentName: 'dddatefield',
                        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAG1BMVEUZHiVHcEwYHCNISEgZHyYYHycUHCwaJSUZICVNlGYDAAAACXRSTlNlAFEDVjYcC0MdqMEEAAAAy0lEQVQoz73TOw+CMBDA8VPEdrTUxypN3CVgXDU+4oivXRPjXDZGBhO/tkcLpiUqi/rf+C3XNgewF8F7vGz1V29tYOZoHNMnhkFGeIgFkvJQ4eAGjYzEgLmSdmCTIEZgIywQYxB+5uwENpLUE+AizggOInqQxEGyhQg+43E53WXMA40sPWvs3w00+z9Or0WJgerm6vZ1ODkW7b94zrDIxFM5vV1zJJ6KopePzH/5nnMbuzkOiY2yqXZpaaV2KYJK+dbxg22r4NOPUOkBusBGIdKfBoUAAAAASUVORK5CYII=',
                        supportSetting: ['label', 'placeholder', 'dateformat', 'required', 'important', 'print']
                    },
                    {
                        name: '日期区间',
                        defaultLable: '开始时间',
                        defaultLable2: '结束时间',
                        defaultProps: '请选择',
                        defaultProps2: '请选择',
                        defaultImportant: false,
                        defaultPrint: false,
                        defaultAutorekonTime: false,
                        defaultFormat: 'yyyy-MM-dd',
                        defaultSubtitle: '时长',
                        componentName: 'dddaterangefield',
                        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAG1BMVEUZHiVHcEwZHSIZHyYZIiQZHiYZHyYcHicYHyWJZRsxAAAACXRSTlNlAFFWCkU4I17EnVm3AAAA10lEQVQoz83Tvw8BMRQH8O/RHqNycUZ3CyMhrD2/5hrsJySMhxCjGPzd3suJtH7NvkvTT5qX5vUV6kPwHQ/LfFcfWmhEjlr+wmALz4gUFF/LBm4J4Rguok+YluPIiH1MaWlZjS8+YUe4NXWREJFSqZdjxVeqigfOdjmGawvt/AsGp03yhmegRMt0YWHIPZorlRUsbEAaUDOa0sIMu6CD4ZFrPDGlEyMuEVlofH4ooJhYOOH7hO3rUv1x67ou1hibwkVd4FlCzwl4lmp4SZeHduXa4OdHeMkd5fRAC6/z8FAAAAAASUVORK5CYII=',
                        supportSetting: [
                            'label',
                            'label2',
                            'placeholder',
                            'placeholder2',
                            'dateformat',
                            'required',
                            'important',
                            'autorekonTime',
                            'subtitle',
                            'print']
                    },
                    {
                        name: '图片',
                        defaultLable: '图片',
                        defaultImportant: false,
                        defaultPrint: false,
                        componentName: 'ddphotofield',
                        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAFVBMVEVHcEwZHiYZHSIcHB4dHiYZHSYZHSWLIHzBAAAAB3RSTlMAZjQQIVdIOwNhIAAAALFJREFUKM+9kj0OwyAMhS1osr8ksLtSO8OQPdygUdq93P8SBZKogrC1ypNYvucfZJvoLMkZhZShBgc9yOprId+THcqC7k/wNh2hwHCEDJgSCjzRl5CVccrkUGBJL4Mco1hF0C4bXINEmAORD36CvJbzOjrBilBt1Vq8ySnWCWLv6zs598FKcG/b4I4pWCndfBfTEY3IhzzGDwQrg/IVkywq87zUIPHvO6odQ/Vsqgd2lj6zvie3/UanrAAAAABJRU5ErkJggg==',
                        supportSetting: ['label', 'required', 'important', 'print']
                    },
                    {
                        name: '明细',
                        defaultLable: '明细',
                        defaultAction: '增加明细',
                        components: [],
                        selected:null,
                        defaultPrint: false,
                        InTableCanvas:null,
                        componentName: 'tablefield',
                        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAGFBMVEUZHSUZHiZHcEwXFxcYHyUbHCMeHykZHiZFWPpcAAAACHRSTlNgZgAKV0oZOF0Pve8AAACVSURBVCjPY1DCAhjwCKYIIgGooLkgpqAaoyADHDBCBJUDBdkRBipABAsERY2QBAVAgimCAklKaIJAS4qV0AUdBd2UMAQFxZWwCDJhFxQUVVIKhDqcDEFjYyUgBgOgoAg2i0gWdHFXUipxAQOEIKrt+ATT0pSAGAyo5iSs3iTCSaJ4BFEtopmgAAMKYAQLogOcgsTmDgBR6V9qAjreuwAAAABJRU5ErkJggg==',
                        supportSetting: ['label', 'action', 'required']
                    },
                    {
                        name: '说明文字',
                        defaultLable: '说明文字',
                        defaultImportant: false,
                        defaultProps: '请输入说明文字',
                        defaultShow: false,
                        defaultPrint: false,
                        defaultHref: '',
                        componentName: 'textnote',
                        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAGFBMVEUZHSUZHiZHcEwXFxcYHyUbHCMeHykZHiZFWPpcAAAACHRSTlNgZgAKV0oZOF0Pve8AAACVSURBVCjPY1DCAhjwCKYIIgGooLkgpqAaoyADHDBCBJUDBdkRBipABAsERY2QBAVAgimCAklKaIJAS4qV0AUdBd2UMAQFxZWwCDJhFxQUVVIKhDqcDEFjYyUgBgOgoAg2i0gWdHFXUipxAQOEIKrt+ATT0pSAGAyo5iSs3iTCSaJ4BFEtopmgAAMKYAQLogOcgsTmDgBR6V9qAjreuwAAAABJRU5ErkJggg==',
                        supportSetting: ['textnote', 'required', 'href', 'print', 'show', 'important']
                    },
                    {
                        name: '金额',
                        defaultLable: '金额（元）',
                        defaultProps: '请输入',
                        defaultImportant: false,
                        defaultTranslate: false,
                        defaultPrint: false,
                        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAGFBMVEUZHSUZHiZHcEwXFxcYHyUbHCMeHykZHiZFWPpcAAAACHRSTlNgZgAKV0oZOF0Pve8AAACVSURBVCjPY1DCAhjwCKYIIgGooLkgpqAaoyADHDBCBJUDBdkRBipABAsERY2QBAVAgimCAklKaIJAS4qV0AUdBd2UMAQFxZWwCDJhFxQUVVIKhDqcDEFjYyUgBgOgoAg2i0gWdHFXUipxAQOEIKrt+ATT0pSAGAyo5iSs3iTCSaJ4BFEtopmgAAMKYAQLogOcgsTmDgBR6V9qAjreuwAAAABJRU5ErkJggg==',
                        componentName: 'moneyfield',
                        supportSetting: ['label', 'placeholder', 'translate', 'required', 'important', 'print']
                    },
                    {
                        name: '附件',
                        defaultLable: '附件',
                        defaultImportant: false,
                        defaultPrint: false,
                        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAGFBMVEUZHSUZHiZHcEwXFxcYHyUbHCMeHykZHiZFWPpcAAAACHRSTlNgZgAKV0oZOF0Pve8AAACVSURBVCjPY1DCAhjwCKYIIgGooLkgpqAaoyADHDBCBJUDBdkRBipABAsERY2QBAVAgimCAklKaIJAS4qV0AUdBd2UMAQFxZWwCDJhFxQUVVIKhDqcDEFjYyUgBgOgoAg2i0gWdHFXUipxAQOEIKrt+ATT0pSAGAyo5iSs3iTCSaJ4BFEtopmgAAMKYAQLogOcgsTmDgBR6V9qAjreuwAAAABJRU5ErkJggg==',
                        componentName: 'ddattachment',
                        supportSetting: ['label', 'required', 'important', 'print']
                    },
                    {
                        name: '外部联系人',
                        defaultLable: '外部联系人',
                        defaultProps: '请选择',
                        defaultPrint: false,
                        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAGFBMVEUZHSUZHiZHcEwXFxcYHyUbHCMeHykZHiZFWPpcAAAACHRSTlNgZgAKV0oZOF0Pve8AAACVSURBVCjPY1DCAhjwCKYIIgGooLkgpqAaoyADHDBCBJUDBdkRBipABAsERY2QBAVAgimCAklKaIJAS4qV0AUdBd2UMAQFxZWwCDJhFxQUVVIKhDqcDEFjYyUgBgOgoAg2i0gWdHFXUipxAQOEIKrt+ATT0pSAGAyo5iSs3iTCSaJ4BFEtopmgAAMKYAQLogOcgsTmDgBR6V9qAjreuwAAAABJRU5ErkJggg==',
                        defaultImportant: false,
                        componentName: 'externalcontactfield',
                        supportSetting: ['label', 'placeholder', 'required', 'important', 'print']
                    }
                ]
            }
        },
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
                obj.componentName = dom.getAttribute("data-type")
                obj.componentText = dom.querySelector('label').innerText
                obj.componentIcon = dom.querySelector('img').src || ''
                obj.clientX = e.clientX
                obj.clientY = e.clientY
                obj.isstart = true
                obj.componentView = this.components[index]
                // drag.$emit("movestart", obj)
            }
        }
    }
</script>
