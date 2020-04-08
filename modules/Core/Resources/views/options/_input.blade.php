@foreach($options as $_option)
    @continue(!isset($_option['name']))
    <div class="layui-form-item">
        <label for="{{ $_option['label']??'_' }}" class="layui-form-label">{{ $_option['label']??'_' }}</label>
        <div class="layui-input-block">
            <input type="text" name="option[".$_option['name']."]" value="{{ option($_option['name']) }}" class="layui-input" {{ isset($_option['disabled'])&&$_option['disabled']?"disabled":'' }} />
        </div>
    </div>
@endforeach

