
<div class="table-responsive">
    <table class="table table-hover table-bordered">
        <thead>
            <tr>
				<th>{{ __('main.id') }}</th>
				<th>{{ __('main.name') }}</th>
				<th>{{ __('main.email') }}</th>
				<th>{{ __('main.email_verified_at') }}</th>
				<th>{{ __('main.password') }}</th>
				<th>{{ __('main.remember_token') }}</th>
				<th>{{ __('main.created_at') }}</th>
				<th>{{ __('main.updated_at') }}</th>
				<th><i class='fa fa-cogs'></i></th>
			</tr>
        </thead>
        <tbody>
        @foreach($users as $item)
            <tr>
				<td>{{ $item->id ?? "" }}</td>
				<td>{{ $item->name ?? "" }}</td>
				<td>{{ $item->email ?? "" }}</td>
				<td>{{ $item->email_verified_at ?? "" }}</td>
				<td>{{ $item->password ?? "" }}</td>
				<td>{{ $item->remember_token ?? "" }}</td>
				<td>{{ $item->created_at ?? "" }}</td>
				<td>{{ $item->updated_at ?? "" }}</td>
				<td>
					<form method="post" action="{{ route("core.users.destroy", $item->id) }}">
						<input type="hidden" name="_method" value="DELETE">
						<input type="hidden" name="_token" value="{{ csrf_token() }}">
						<div class="btn-group">
							<a class="btn btn-xs" title="查看" data-toggle="modal" data-position="fixed" href="{{ route("core.users.show", $item->id) }}"><i class="fa fa-eye"></i></a>
							<a class="btn btn-xs" title="编辑" data-toggle="modal" data-position="fixed" href="{{ route("core.users.edit", $item->id) }}"><i class="fa fa-edit"></i></a>
							<button type="submit" class="btn btn-xs btn-danger" onclick="return confirm('确认删除?')"><i class="fa fa-trash "></i></button>
						</div>
					</form>
				</td>
			</tr>
        @endforeach
        </tbody>
    </table>
    {{ $users->appends(request()->all())->links('__page') }}
</div>
