@extends('core::layouts.master')

@section('content')
    <x-card>
        <x-form :action="route('core.users.update', $user->user_id)" method="patch">
            @include('core::users.fields')
        </x-form>
    </x-card>
@endsection
