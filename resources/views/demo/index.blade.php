
    @includeWhen(Illuminate\Support\Facades\View::exists('demo.'.request('demo')), 'demo.'.request('demo'))
