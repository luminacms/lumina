@extends('core::layouts.full')

@section('body', 'p-form')

@section('content')
    <div id="app"></div>
    <script src="{{ mix('js/form.js', 'dist') }}"></script>
@endsection
