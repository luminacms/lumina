@extends('layouts.modal')

@section('content')
    <div class="layui-card">
		<div class="layui-card-header">详情</div>
		<div class="layui-card-body">
            <table class="layui-table">
                <tbody>
				<tr><td width=150>{{ __("field.id") }}</td><td>{!! $productbrand->id !!}</td></tr>
				<tr><td width=150>{{ __("field.create_by") }}</td><td>{!! $productbrand->create_by !!}</td></tr>
				<tr><td width=150>{{ __("field.name") }}</td><td>{!! $productbrand->name !!}</td></tr>
				<tr><td width=150>{{ __("field.status") }}</td><td>{!! $productbrand->status !!}</td></tr>
				<tr><td width=150>{{ __("field.logo_src") }}</td><td>{!! $productbrand->logo_src !!}</td></tr>
				<tr><td width=150>{{ __("field.description") }}</td><td>{!! $productbrand->description !!}</td></tr>
				<tr><td width=150>{{ __("field.created_at") }}</td><td>{!! $productbrand->created_at !!}</td></tr>
				<tr><td width=150>{{ __("field.updated_at") }}</td><td>{!! $productbrand->updated_at !!}</td></tr>
			</tbody>
            </table>
        </div>
    </div>
@endsection
