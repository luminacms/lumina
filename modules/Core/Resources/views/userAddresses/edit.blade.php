@extends('layouts.modal')

@section('content')
	<div class="layui-card layui-form">
		<div class="layui-card-header">编辑</div>
		<div class="layui-card-body">

			<form action="{{ route('core.user-addresses.update', $useraddress->id) }}" method="post" class="layui-form ">
					<input type="hidden" name="_method" value="patch" >
					{{ csrf_field() }}

					<div class="layui-row layui-col-space10 layui-form-item">
							@include('core::userAddresses.fields')
					</div>
					
			</form>

		</div>
	</div>

@endsection