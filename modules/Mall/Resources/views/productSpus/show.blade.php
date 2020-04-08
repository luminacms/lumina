@extends('layouts.modal')

@section('content')
    <div class="layui-card">
		<div class="layui-card-header">详情</div>
		<div class="layui-card-body">
            <table class="layui-table">
                <tbody>
				<tr><td width=150>{{ __("field.id") }}</td><td>{!! $productspu->id !!}</td></tr>
				<tr><td width=150>{{ __("field.brand_id") }}</td><td>{!! $productspu->brand_id !!}</td></tr>
				<tr><td width=150>{{ __("field.category_id") }}</td><td>{!! $productspu->category_id !!}</td></tr>
				<tr><td width=150>{{ __("field.status") }}</td><td>{!! $productspu->status !!}</td></tr>
				<tr><td width=150>{{ __("field.name") }}</td><td>{!! $productspu->name !!}</td></tr>
				<tr><td width=150>{{ __("field.description") }}</td><td>{!! $productspu->description !!}</td></tr>
				<tr><td width=150>{{ __("field.unit") }}</td><td>{!! $productspu->unit !!}</td></tr>
				<tr><td width=150>{{ __("field.thumb") }}</td><td>{!! $productspu->thumb !!}</td></tr>
				<tr><td width=150>{{ __("field.pic_url") }}</td><td>{!! $productspu->pic_url !!}</td></tr>
				<tr><td width=150>{{ __("field.price_fee") }}</td><td>{!! $productspu->price_fee !!}</td></tr>
				<tr><td width=150>{{ __("field.market_price_fee") }}</td><td>{!! $productspu->market_price_fee !!}</td></tr>
				<tr><td width=150>{{ __("field.create_by") }}</td><td>{!! $productspu->create_by !!}</td></tr>
				<tr><td width=150>{{ __("field.created_at") }}</td><td>{!! $productspu->created_at !!}</td></tr>
				<tr><td width=150>{{ __("field.updated_at") }}</td><td>{!! $productspu->updated_at !!}</td></tr>
			</tbody>
            </table>
        </div>
    </div>
@endsection
