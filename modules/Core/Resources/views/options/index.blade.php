@extends('core::layouts.master')

@section('content')
    <x-submenu :items="[
        ['name' => '配置管理', 'uri' => route('core.option.index')],
        ['name' => '说明文档', 'uri' => route('core.doc', ['path' => urlencode(module_path('core').'/readme.md')]), 'right'=>true],
        ['name' => 'MD语法实例文档', 'uri' => route('core.doc', ['path' => urlencode(module_path('core').'/markdown.md')]), 'right'=>true],
    ]" />

    <x-card>
        <div class="layui-collapse" lay-accordion>
                @php $i = 0; @endphp
                @foreach(Module::getOrdered() as $module)
                    @if($_config_options = config($module->getAlias().'.options'))
                    <?php $_permisson_key = 'module_'.$module->getAlias();?>
                    @continue(
                        auth()->oid() != '1' &&
                        !in_array($module->getAlias(), ['core']) &&
                        !(Modules\Core\Models\Permission::where('name', $_permisson_key)->exists()&&
                        auth()->org()->hasPermissionTo($_permisson_key, 'org'))
                    )
                    @php $i++; @endphp

                    <div class="layui-colla-item">
                        <h2 class="layui-colla-title">【{{ $module->getName() }}】{{ $module->getDescription() }}</h2>
                        <div class="layui-colla-content @if($i == 1)layui-show @endif">
                            <x-form :action="route('core.option.index')" method="post">

                            <?php $group_options = (collect($_config_options)->groupBy('group'));;?>
                            @if($group_options->count() == 1)
                                @include('core::options._input', ['options' => $group_options->first()])
                            @else
                                <div class="layui-tab layui-tab-card">
                                    <ul class="layui-tab-title">
                                        @foreach($group_options as $_key => $_option)
                                        <li @if($loop->first)class="layui-this"@endif>{{ $_key }}</li>
                                        @endforeach
                                    </ul>
                                    <div class="layui-tab-content">
                                        @foreach($group_options as $_key => $_option)
                                            @if($loop->first)
                                                <div class="layui-tab-item layui-show">
                                            @else
                                                <div class="layui-tab-item">
                                            @endif

                                            @include('core::options._input', ['options' => $_option])
                                        </div>
                                        @endforeach
                                    </div>
                                </div>
                            @endif

                            <div class="layui-form-item layui-layout-admin mt-4">
                                <div class="layui-input-block">
                                    <button class="layui-btn" lay-submit lay-filter="component-form-demo1">保存</button>
                                </div>
                            </div>

                            </x-form>
                        </div>
                    </div>
                    @endif
                @endforeach
            </div>
    </x-card>

@endsection
