<template>
    <div id="app" class="page_edit g_full" v-on:mouseup="moveend" v-on:mousemove="move">
        <tophead :save="save"></tophead>
        <div class="g_container">
            <div class="editor_container">
                <sidebar :components="components"></sidebar>
                <formcanvas ref="formcanvas" :vote="vote"></formcanvas>
                <setting></setting>
            </div>
        </div>
        <dragging></dragging>
    </div>
</template>

<script type="text/ecmascript-6">
    import tophead from './components/header'
    import sidebar from './components/sidebar'
    import formcanvas from './components/formcanvas'
    import setting from './components/setting'
    import dragging from './components/dragging'
    import $http from '$libs/http'
    import {getParams} from '$libs/utils'
    import {Notification} from 'element-ui';

    export default {
        name: 'app',
        components: {
            tophead,
            sidebar,
            formcanvas,
            setting,
            dragging
        },
        data: function () {
            return {
                vote: {},
                voteid: null,
                components: [
                    {
                        title: '单选框',
                        tip: '',
                        important: false,
                        type: 'radio',
                        icon: 'el-icon-basketball',
                        options: [
                            {idx: 1, value: '选项1',type: 'text'},
                            {idx: 2, 'value': '选项2',type: 'text'},
                            {idx: 3, value: '选项3',type: 'text'}
                        ],
                        supportSetting: ['title', 'tip', 'options', 'important']
                    },
                    {
                        title: '多选框',
                        tip: '',
                        important: false,
                        type: 'checkbox',
                        icon: 'el-icon-football',
                        options: [
                            {idx: 1, value: '选项1',type: 'text'},
                            {idx: 2, 'value': '选项2',type: 'text'},
                            {idx: 3, value: '选项3',type: 'text'}
                        ],
                        supportSetting: ['title', 'tip', 'options', 'important']
                    }
                ]
            }
        },
        methods: {
            move: function (e) {
                if (this.isstart) {
                    document.querySelector('html').classList.add('wf-cursor-move')
                    let obj = {
                        componentType: this.componentView.componentType,
                        clientX: e.clientX,
                        clientY: e.clientY
                    }
                    drag.$emit("moveInCanvas", obj)
                    drag.$emit('move', e)
                }
            },
            moveend: function (e) {
                if (this.isstart) {
                    let obj = {
                        componentView: this.componentView
                    }
                    drag.$emit("moveend", obj)
                    this.isstart = false
                }
            },
            save: function(){
                let self = this
                $http.post('/interface/vote/'+this.voteid+'/subject', this.$refs.formcanvas.vote).then((res) => {
                    self.makeVoteSubject(res.data)
                    Notification.success('保存成功')
                })
            },
            makeVoteSubject: function(vote){
                let _subjects = vote.subjects
                let self = this
                for (var i = 0; i < _subjects.length; i++) {
                    _subjects[i].idx = i
                    for (var j=0;j<self.components.length;j++) {
                        if(_subjects[i].type == self.components[j].type) {
                            _subjects[i].supportSetting = self.components[j].supportSetting
                            break;
                        }
                    }
                }
                self.vote = Object.assign({}, vote, {'subjects': _subjects})
            }
        },
        created: function () {
            let self = this
            let formid = getParams()
            this.voteid = formid.id;

            if(!this.voteid){
                Notification.error('保存成功');
                return;
            }
            $http.get('/interface/vote/'+formid.id).then((res) => {
                console.log(res)
                self.makeVoteSubject(res.data)
            })
            drag.$on('movestart', function (obj) {
                self.isstart = true
                self.componentView = obj.componentView
            })
            drag.$on('deleteSubject', function(voteid, subjectid) {
                $http.post('/interface/vote/'+voteid+'/subject/delete', {'subject_id': subjectid}).then((res) => {
                    self.makeVoteSubject(res.data)
                    Notification.success('保存成功')
                })
            })

        },
    }

</script>
