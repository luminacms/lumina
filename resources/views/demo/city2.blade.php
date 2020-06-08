@extends('core::layouts.blank')

@section('content')


{{-- <x-region name="province,city,region" /> --}}

<div class="layui-form">

<div class="x-region-select" lay-region>
    <input type="hidden" name="_data" value='{!! json_encode(Modules\Core\Models\Region::getSimpleTree()) !!}'>
    <select name="shop[province_id]" data-province required>
        <option value="">请选择省份</option>
    </select>
    <select name="shop[city_id]" data-city required>
        <option value="">请选择城市</option>
    </select>
    <select name="shop[region_id]" data-region required>
        <option value="">请选择地区</option>
    </select>
</div>

</div>

<script>
    layui.use('form')

    $(function(){
        var methods = {
            addItem: function ($ele, data) {
                var selectedId = $ele.data('id')
                    , isSelected = false;
                $.each(data, function (i, item) {
                    if (isSelected === false) {
                        isSelected === false && (isSelected = selectedId > 0 && selectedId === item.id);
                    }
                    var optionStr = '<option value="' + item.id + '">' + item.label + '</option>';
                    $ele.append(optionStr);
                });
                // console.log(isSelected);
                isSelected && $ele.val(selectedId);

                $ele.change();
            },
            clearItem: function ($ele) {
                $ele.find('option').remove();
            }
        };

        // 注册省市区三级联动选择事件
        $('[lay-region]').each(function () {
            var $dom = $(this);
            var REGIONS = $.parseJSON($dom.find('input[name=_data]').val());
            var $province = $dom.find('[data-province]')
                , $city = $dom.find('[data-city]')
                , $region = $dom.find('[data-region]');
            // 选择省联动城市列表
            $province.on("change", function () {
                var provinceId = Number($(this).val());
                if (provinceId > 0) {
                    methods.clearItem($city);
                    methods.clearItem($region);
                    $city.data('provinceId', provinceId);
                    // 遍历城市列表
                    methods.addItem($city, _.find(REGIONS, {'id': provinceId}).children);
                }
            });
            // 选择市联动地区列表
            $city.on("change", function () {
                var $this = $(this)
                    , provinceId = $this.data('provinceId')
                    , cityId = Number($this.val());
                if (cityId > 0) {
                    methods.clearItem($region);
                    $region.data('cityId', cityId);
                    // 遍历地区列表
                    var _province = _.find(REGIONS, {'id': provinceId}).children
                    methods.addItem($region, _.find(_province, {'id': cityId}).children);
                }
            });
            // 遍历省份列表
            methods.addItem($province, REGIONS);
        });

    })
</script>


@endsection


