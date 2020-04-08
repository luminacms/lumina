@extends('layouts.modal')

@section('content')
	<div class="layui-card layui-form">
		<div class="layui-card-header">编辑</div>
		<div class="layui-card-body">

			<form action="{{ route('mall.productSkus.update', $productsku->id) }}" method="post">
					<input type="hidden" name="_method" value="patch" >
					{{ csrf_field() }}

					<div class="layui-row layui-col-space10 layui-form-item">
							@include('mall::productSkus.fields')
					</div>
					
			</form>

		</div>
	</div>

@endsection