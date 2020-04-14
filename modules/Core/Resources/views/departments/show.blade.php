@extends('layouts.modal')

@section('content')
    <div class="row" style="padding-left: 20px">
        <table class="table table-hover table-bordered">
            <tbody>
				<tr><td>{{ __("field.id") }}</td><td>{!! $user->userid !!}</td></tr>
				<tr><td>{{ __("field.name") }}</td><td>{!! $user->name !!}</td></tr>
				<tr><td>{{ __("field.email") }}</td><td>{!! $user->email !!}</td></tr>
				<tr><td>{{ __("field.email_verified_at") }}</td><td>{!! $user->email_verified_at !!}</td></tr>
				<tr><td>{{ __("field.password") }}</td><td>{!! $user->password !!}</td></tr>
				<tr><td>{{ __("field.remember_token") }}</td><td>{!! $user->remember_token !!}</td></tr>
				<tr><td>{{ __("field.created_at") }}</td><td>{!! $user->created_at !!}</td></tr>
				<tr><td>{{ __("field.updated_at") }}</td><td>{!! $user->updated_at !!}</td></tr>
			</tbody>
        </table>
    </div>
@endsection
