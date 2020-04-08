@extends('layouts.modal')

@section('content')
    <div class="layui-card">
		<div class="layui-card-header">详情</div>
		<div class="layui-card-body">
            <table class="layui-table">
                <tbody>
				<tr><td width=150>{{ __("field.id") }}</td><td>{!! $productcategory->id !!}</td></tr>
				<tr><td width=150>{{ __("field.create_by") }}</td><td>{!! $productcategory->create_by !!}</td></tr>
				<tr><td width=150>{{ __("field.status") }}</td><td>{!! $productcategory->status !!}</td></tr>
				<tr><td width=150>{{ __("field.name") }}</td><td>{!! $productcategory->name !!}</td></tr>
				<tr><td width=150>{{ __("field.parentid") }}</td><td>{!! $productcategory->parentid !!}</td></tr>
				<tr><td width=150>{{ __("field.path") }}</td><td>{!! $productcategory->path !!}</td></tr>
				<tr><td width=150>{{ __("field.level") }}</td><td>{!! $productcategory->level !!}</td></tr>
				<tr><td width=150>{{ __("field.order") }}</td><td>{!! $productcategory->order !!}</td></tr>
				<tr><td width=150>{{ __("field.thumb") }}</td><td>{!! $productcategory->thumb !!}</td></tr>
				<tr><td width=150>{{ __("field.created_at") }}</td><td>{!! $productcategory->created_at !!}</td></tr>
				<tr><td width=150>{{ __("field.updated_at") }}</td><td>{!! $productcategory->updated_at !!}</td></tr>
			</tbody>
            </table>
        </div>
    </div>
@endsection
