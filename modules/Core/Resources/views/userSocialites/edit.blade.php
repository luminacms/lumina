@extends('core::layouts.master')

@section('content')
	<div class="layui-card layui-form">
		<div class="layui-card-header">编辑#{{ $userSocialite->id }}</div>
		<div class="layui-card-body">
            <x-form :action="route('core.user-socialites.update', $userSocialite->id)" method="patch">

				<div class="layui-row layui-col-space10 layui-form-item">
					@include('core::userSocialites.fields')
				</div>

			</x-form>
		</div>
	</div>
@endsection
