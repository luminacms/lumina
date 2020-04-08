@extends('layouts.modal')

@section('content')
    <div class="layui-card">
		<div class="layui-card-header">详情</div>
		<div class="layui-card-body">
            <table class="layui-table">
                <tbody>
				<tr><td width=150>{{ __("field.id") }}</td><td>{!! $productsku->id !!}</td></tr>
				<tr><td width=150>{{ __("field.spu_id") }}</td><td>{!! $productsku->spu_id !!}</td></tr>
				<tr><td width=150>{{ __("field.attrs") }}</td><td>{!! $productsku->attrs !!}</td></tr>
				<tr><td width=150>{{ __("field.thumb") }}</td><td>{!! $productsku->thumb !!}</td></tr>
				<tr><td width=150>{{ __("field.pics") }}</td><td>{!! $productsku->pics !!}</td></tr>
				<tr><td width=150>{{ __("field.price_fee") }}</td><td>{!! $productsku->price_fee !!}</td></tr>
				<tr><td width=150>{{ __("field.market_price_fee") }}</td><td>{!! $productsku->market_price_fee !!}</td></tr>
				<tr><td width=150>{{ __("field.status") }}</td><td>{!! $productsku->status !!}</td></tr>
				<tr><td width=150>{{ __("field.create_by") }}</td><td>{!! $productsku->create_by !!}</td></tr>
				<tr><td width=150>{{ __("field.created_at") }}</td><td>{!! $productsku->created_at !!}</td></tr>
				<tr><td width=150>{{ __("field.updated_at") }}</td><td>{!! $productsku->updated_at !!}</td></tr>
			</tbody>
            </table>
        </div>
    </div>
@endsection
