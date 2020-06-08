@extends('core::layouts.blank')

@section('content')
    <style>
        .spec .spec__item{border-color: #b8b7bd;padding: 2px 5px;}
        .spec .spec__item.on{border-color: #FF0036;}
        .spec .spec__item>i{
            position: absolute;
            bottom: 0;
            right: 0;
            width: 12px;
            height: 12px;
            overflow: hidden;
            text-indent: -99em;
            display: block;
            background-repeat: no-repeat;
            background-position: 0 0;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJUExURUxpcf8AN////7f4NBoAAAABdFJOUwBA5thmAAAAMUlEQVQI103MAQ4AMAQEQev/j66i6YrEXIKIX9jY2NjYyDmhZnlCo5rdyWvebfYDVAcSmABbA7WD+QAAAABJRU5ErkJggg==);
        }
    </style>

    <div style="max-width: 800px;margin:0 auto;display:none;" class="shadow-2xl pb-12 bg-white layui-form">
        <x-form action="{{ url()->full() }}" method="post">
            <x-card>

                <div id="specWrap">

                    <x-formItem label="商品名称">
                        <span>{{ $spu->name }}</span>
                    </x-formItem>

                    <x-formItem label="售价">
                        <span class="text-3xl text-red-500">￥@{{ actived.price_fee }}</span>
                        <span class="line-through">￥@{{ actived.market_price_fee }}</span>
                    </x-formItem>

                    <div class="layui-form-item" v-for="item in spec_attr" data-id="@{{item.id}}">
                        <label for="name" class="layui-form-label ">@{{ item.label }}：</label>
                        <div class="layui-input-block spec">
                            <div :class="[ checked[item.id]==val.id?'on':'', 'spec__item relative inline-block  border-2 mx-2 cursor-pointer']"
                                v-for="val in item.children" data-id="item.id" @click="specChange(item,val)">
                                @{{ val.label }}
                                <i v-if="checked[item.id]==val.id"></i>
                            </div>
                        </div>
                    </div>

                    <x-formItem label="购买量">
                        <input type="number" name="number" class="layui-input" v-model="actived.number" title="请输入购买量">
                        <span>（库存剩余：@{{ actived.stock }}件）</span>
                    </x-formItem>

                    <input type="hidden" v-model="actived.uid" name="sku" />
                    <input type="hidden" v-model="pre_total_fee" name="pre_total_fee">
                </div>

                <x-formItem label="姓名">
                    <x-input name="address[contact_name]" />
                </x-formItem>
                <x-formItem label="手机">
                    <x-input name="address[contact_phone]" />
                </x-formItem>

                <x-formItem label="地区">
                    <x-region name="address[province],address[city],address[region]" />
                </x-formItem>

                <x-formItem label="详细地址">
                    <x-input name="address[address]" />
                </x-formItem>
                <x-formItem label="留言">
                    <x-input name="msg" />
                </x-formItem>

                <button type="submit" class="layui-btn">立即下订单</button>

            </x-card>
        </x-form>
    </div>


@endsection

@push('script')
<script>
    layui.use(['vue', 'city', 'form', 'element'], function(){
        var vue = layui.vue,
            city = layui.city;

        $(".layui-form").show();
        city.render({
            elem: '#elem',
            names: {
                province: "address[province]",
                city: "address[city]",
                area: "address[district]"
            }
        })


        new vue({
            el: '#specWrap',
            data: function(){
                return {
                    spu: @json($spu),
                    checked: {},
                    actived: {},
                    spec_attr: @json($spec_data['attr'] ?? []),
                    spec_list: @json($spec_data['list'] ?? []),
                }
            },
            created: function(){
                this.resetActived()
                // 初始化选项
                var _group = this.spec_attr[0]
                this.specChange(_group,_group.children[0])
            },
            computed: {
                pre_total_fee() {
                    return (this.actived.number*this.actived.price_fee).toFixed(2)
                }
            },
            methods: {
                resetActived: function(){
                    if(this.spu.type == 1) {
                        // 单规格
                        this.actived = this.spec_list[0].form
                    }else{
                        this.actived = {
                            uid: '',
                            price_fee: 0,
                            market_price_fee: 0,
                            stock: 0,
                            pre_total_fee: 0,
                            number: 1,
                        }
                    }
                },
                specChange: function(group, item){
                    var _group = {},
                        spec_val_ids = '',
                        _val = {};

                    _group[group.id] = item.id

                    // 更新界面信息
                    this.checked = Object.assign({}, this.checked, _group)

                     // 查找对应sku
                    spec_val_ids = Object.values(this.checked).join(',');
                    _val = _.find(this.spec_list, {'spec_val_ids': spec_val_ids})

                    if(_val) {
                        this.actived = Object.assign({}, this.actived, _val.form)
                    }else{
                        this.resetActived()
                    }

                }
            }
        })

    })
</script>
@endpush
