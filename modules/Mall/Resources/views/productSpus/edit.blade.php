@extends('layouts.modal')

@section('content')
	<div class="layui-card layui-form">
		<div class="layui-card-header">编辑</div>
		<div class="layui-card-body">

			<form action="{{ route('mall.product-spus.update', $productspu->id) }}" method="post" class="layui-form ">
					<input type="hidden" name="_method" value="patch" >
					{{ csrf_field() }}

					<div class="layui-row layui-col-space10 layui-form-item">
							@include('mall::productSpus.fields')
					</div>
					
			</form>

		</div>
	</div>

@endsection