@extends('core::layouts.master')

@section('content')
    <x-card>
        <x-form :action="route('core.departments.update', $department->id)" method="patch">
            @include('core::departments.fields')
        </x-form>
    </x-card>

@endsection
