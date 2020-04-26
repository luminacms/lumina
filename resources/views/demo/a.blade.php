@extends('core::layouts.master')

@section('content')

<div id="skuBox">

    <el-form-item label="同行人"   prop="traveler_list" >
        <el-select
            v-model="tongxin"
            style="width:100%"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="fetchUser"
            :loading="loading">
            <el-option
                v-for="item in userOptions"
                :key="item.userid"
                :label="item.name"
                :value="item.userid">
            </el-option>
        </el-select>
    </el-form-item>

    <el-tabs tab-position="left" style="height: 200px;">
        <el-tab-pane label="用户管理">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
</div>

@endsection


@push('style')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-ui@2.13.1/lib/theme-chalk/index.css">
@endpush

@push('script')
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/element-ui@2.13.1/lib/index.js"></script>
<script>
    var app = new Vue({
        el: '#skuBox',
        data(){
            return {

            }
        },
        methods: {
            fetchUser(queryString) {
                var self = this
                self.makeRequest('get', api_usersearch+'?search=name:'+queryString, {}, function(res) {
                    self.userOptions = res
                })
            }
        }
    })
</script>
@endpush
