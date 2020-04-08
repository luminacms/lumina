@extends('core::layouts.master')

@section('content')
	<div class="layui-card layui-form">
		<div class="layui-card-header">编辑#{{ $permission->id }}</div>
		<div class="layui-card-body">
            <x-form :action="route('core.permission.update', $permission->id)" method="patch">

				<div class="layui-row layui-col-space10 layui-form-item">
					@include('core::permissions.fields')
				</div>

			</x-form>
		</div>
	</div>
@endsection
