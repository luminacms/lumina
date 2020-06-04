<div id="spec_wrap" style="display: none">
    <table class="layui-table static">
        <tbody>
            <tr>
                <th>
                    <x-formItem label="规格名称" class="mb-0">
                        @if(!isset($spec))
                            <x-input name="name" :value="$spec->name??''" required place="全局唯一" />
                            <input type="hidden" name="specs" v-model="JSON.stringify(data)">
                        @else
                            <x-input name="name" :value="$spec->name??''" required place="全局唯一" readonly />
                        @endif
                    </x-formItem>
                </th>
            </tr>
            <tr v-if="!readonly"><td><a class="layui-btn layui-btn-sm" @click="specAdd">新增子规格</a></td></tr>
            <tr>
                <td>
                    <table class="layui-table static" v-for="(item, idx) in data">
                        <tr>
                            <th>规格@{{ idx+1 }}：
                                <a v-if="!readonly" class="cursor-pointer" @click="specDel(idx)"><i class="fa fa-trash text-red-600"></i></a>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <div class="layui-form-item mb-0">
                                    <label for="name" class="layui-form-label ">
                                        子规格名称
                                    </label>
                                    <div class="layui-input-block">
                                        <input type="text" v-model="item.label" class="layui-input" :readonly="readonly" lay-verify="required">
                                    </div>
                                </div>
                                <x-formItem label="子规格选项" inline class="{{ !isset($spec)?'layui-input-icon': '' }}">
                                    <label for="" v-for="(opt, optIdx) in item.children" class="mb-2">
                                        <input type="text" v-model="opt.label" class="layui-input" lay-verify="required" :readonly="readonly">
                                        <i v-if="!readonly" class="fa fa-trash text-red-600 cursor-pointer" @click="optionDel(idx, optIdx)"></i>
                                    </label>
                                    <label for="" v-if="!readonly">
                                        <a class="layui-btn layui-btn-xs ml-4 cursor-pointer" @click="optionAdd(idx)"><i class="fa fa-plus"></i>新增</a>
                                    </label>
                                </x-formItem>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<x-formItem class="layui-layout-admin">
    <div class="layui-footer z-50 shadow" style="left:0;">
        @if(!isset($spec))
        <button class="layui-btn J_ajax" lay-submit>{{ __('core::main.submit') }}</button>
        @endif

		<button type="reset" class="layui-btn layui-btn-primary" lay-submit-cancel>{{ __('core::main.reset') }}</button>
	</div>
</x-formItem>

@push('script')
	<script>
		layui.use(['form', 'vue'], function(){
			var form = layui.form,
                vue = layui.vue;

            $("#spec_wrap").show()
            new Vue({
                el: '#spec_wrap',
                data: function(){
                    return {
                        readonly: @json(isset($spec)),
                        data: @json(isset($spec) ? $spec->getValOptions() : [])
                    }
                },
                methods: {
                    specAdd: function(){
                        if(this.data.length >= 3) {
                            layer.msg('子规格最多3个');
                            return;
                        }
                        this.data.push({
                            'label': '',
                            'children': [{'label': ''}]
                        })
                    },
                    specDel: function(idx){
                        var _item = this.data

                        if(_item.length <= 1) {
                            layer.msg('至少保留一个规格');
                            return;
                        }

                        _item.splice(idx, 1)
                        this.data = _item
                    },
                    optionAdd: function(idx) {
                        var _opts = this.data[idx].children

                        _opts.push({'label': ''})
                    },
                    optionDel: function(idx, optIdx) {
                        var _opts = this.data[idx].children

                        if(_opts.length <= 1) {
                            layer.msg('至少保留一个选项');
                            return;
                        }

                        _opts.splice(optIdx, 1)
                        this.data[idx].children = _opts
                    }
                }
            })
		})
	</script>
@endpush
