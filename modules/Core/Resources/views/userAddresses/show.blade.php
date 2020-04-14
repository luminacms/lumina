@extends('layouts.modal')

@section('content')
    <div class="layui-card">
		<div class="layui-card-header">详情</div>
		<div class="layui-card-body">
            <table class="layui-table">
                <tbody>
				<tr><td width=150>{{ __("field.id") }}</td><td>{!! $useraddress->id !!}</td></tr>
				<tr><td width=150>{{ __("field.userid") }}</td><td>{!! $useraddress->userid !!}</td></tr>
				<tr><td width=150>{{ __("field.province") }}</td><td>{!! $useraddress->province !!}</td></tr>
				<tr><td width=150>{{ __("field.city") }}</td><td>{!! $useraddress->city !!}</td></tr>
				<tr><td width=150>{{ __("field.district") }}</td><td>{!! $useraddress->district !!}</td></tr>
				<tr><td width=150>{{ __("field.address") }}</td><td>{!! $useraddress->address !!}</td></tr>
				<tr><td width=150>{{ __("field.zip") }}</td><td>{!! $useraddress->zip !!}</td></tr>
				<tr><td width=150>{{ __("field.contact_name") }}</td><td>{!! $useraddress->contact_name !!}</td></tr>
				<tr><td width=150>{{ __("field.contact_phone") }}</td><td>{!! $useraddress->contact_phone !!}</td></tr>
				<tr><td width=150>{{ __("field.lastused_at") }}</td><td>{!! $useraddress->lastused_at !!}</td></tr>
				<tr><td width=150>{{ __("field.created_at") }}</td><td>{!! $useraddress->created_at !!}</td></tr>
				<tr><td width=150>{{ __("field.updated_at") }}</td><td>{!! $useraddress->updated_at !!}</td></tr>
			</tbody>
            </table>
        </div>
    </div>
@endsection
