<template>
    <div class="wf-form wf-widgetsettings">
        <div v-if="subject.cantitle" class="wf-field wf-setting-label">
            <div class="fieldname">
                <span>标题</span>
                <span class="fieldinfo">最多10个字</span>
            </div>
            <div class="fieldblock">
                <input type="text" @input="changeComponent" maxlength="10" v-model="subject.title">
            </div>
        </div>
        <div v-if="subject.cantip" class="wf-field wf-setting-placeholder">
            <div class="fieldname">
                <span>提示文字</span>
                <span class="fieldinfo">最多20个字</span>
            </div>
            <div class="fieldblock">
                <input type="text" @input="changeComponent" maxlength="20" v-model="subject.tip">
            </div>
        </div>
        <div v-if="subject.canoptions" class="wf-field wf-setting-options">
            <div class="fieldname">
                <span>选项</span>
                <span class="fieldinfo">最多200项,每项最多20个字</span>
            </div>
            <div v-bind:class="{limitdel:subject.options.length<=1,limitadd:subject.options.length>=200}">
                <div v-for="(n,index) in subject.options" class="fieldblock wf-setting-options">
                    <el-row class="mb-4">
                        <el-col :span="18">
                            <el-input v-model="n.value" size="small" :readonly="n.type=='image'"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <a @click="del" v-bind:data-index="index" class="action action-del"><i class="el-icon-minus"></i></a>
                            <a @click="add" v-bind:data-index="index" class="action action-add"><i class="el-icon-plus"></i></a>
                            <el-upload
                                    class="upload"
                                    action="/interface/core/upload?fullpath=1"
                                    :limit="1"
                                    :headers="{'X-CSRF-TOKEN': uploadHead}"
                                    :show-file-list=false
                                    :on-success="function (res,file){return handleUpload(res,index)}"
                                    :file-list="fileList">
                                <i class="el-icon-picture"></i>
                            </el-upload>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>

        <div v-if="subject.canimportant" class="wf-field wf-setting-required">
            <div class="fieldname">验证</div>
            <label class="fieldblock">
                <input type="checkbox" @change="changeComponent" value="1" v-model="subject.required">
                <span class="verticalmiddle">必填</span>
            </label>
        </div>

    </div>
</template>
<script>
    export default{
        data: function () {
            return {
                fileList: [],
                subject: {
                }
            }
        },
        methods: {
            add: function (e) {
                e.stopPropagation()
                e.preventDefault()
                let index = e.currentTarget.getAttribute('data-index');
                for (let i = 0, l = this.subject.options.length; i < l; i++) {
                    let has = false;
                    for (let item in this.subject.options) {
                        if (this.subject.options[item].idx == (i + 1)) {
                            has = true
                        }
                    }
                    if (!has) {
                        this.subject.options.splice((+index + 1), 0, {idx: i + 1, text: '选项' + (i + 1), type: 'text'})
                        return
                    }
                }
                if (index == this.subject.options.length - 1) {
                    this.subject.options.push({
                        idx: (this.subject.options.length + 1),
                        type: 'text',
                        text: '选项' + (this.subject.options.length + 1)
                    })
                } else {
                    this.subject.options.splice((+index + 1), 0, {
                        idx: (this.subject.options.length + 1),
                        type: 'text',
                        text: '选项' + (this.subject.options.length + 1)
                    })
                }
            },
            del: function (e) {
                e.stopPropagation()
                e.preventDefault()
                let index = e.currentTarget.getAttribute('data-index');
                this.subject.options.splice(index, 1)
            },
            handleUpload: function(response, idx) {
                let _opt = this.subject.options[idx]

                _opt.type = 'image'
                _opt.value = response.data.url

                this.subject.options[idx] = _opt
            },
            changeComponent: function () {
                drag.$emit("changeComponent", this.subject);
            }
        },

        created: function () {
            let self = this
            drag.$on("selectComponent", function (obj) {
                self.subject = {}
                for (let i = 0; i < obj.supportSetting.length; i++) {
                    obj['can'+obj.supportSetting[i]] = true
                }
                self.subject = Object.assign({}, self.subject, obj)
            })

        },
        computed: {
            uploadHead: () => {
                let token = document.head.querySelector('meta[name="csrf-token"]');
                return String(token.content)
            }
        }
    }
</script>
