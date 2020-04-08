
<div class="table-responsive">
    <table class="table table-hover table-bordered">
        <thead>
            <tr>
				<th>{{ __('main.id') }}</th>
				<th>{{ __('main.user_id') }}</th>
				<th>{{ __('main.province') }}</th>
				<th>{{ __('main.city') }}</th>
				<th>{{ __('main.district') }}</th>
				<th>{{ __('main.address') }}</th>
				<th>{{ __('main.zip') }}</th>
				<th>{{ __('main.contact_name') }}</th>
				<th>{{ __('main.contact_phone') }}</th>
				<th>{{ __('main.lastused_at') }}</th>
				<th>{{ __('main.created_at') }}</th>
				<th>{{ __('main.updated_at') }}</th>
				<th><i class='fa fa-cogs'></i></th>
			</tr>
        </thead>
        <tbody>
        @foreach($userAddresses as $item)
            <tr>
				<td>{{ $item->id ?? "" }}</td>
				<td>{{ $item->user_id ?? "" }}</td>
				<td>{{ $item->province ?? "" }}</td>
				<td>{{ $item->city ?? "" }}</td>
				<td>{{ $item->district ?? "" }}</td>
				<td>{{ $item->address ?? "" }}</td>
				<td>{{ $item->zip ?? "" }}</td>
				<td>{{ $item->contact_name ?? "" }}</td>
				<td>{{ $item->contact_phone ?? "" }}</td>
				<td>{{ $item->lastused_at ?? "" }}</td>
				<td>{{ $item->created_at ?? "" }}</td>
				<td>{{ $item->updated_at ?? "" }}</td>
				<td>
					<form method="post" action="{{ route("core.user-addresses.destroy", $item->id) }}">
						<input type="hidden" name="_method" value="DELETE">
						<input type="hidden" name="_token" value="{{ csrf_token() }}">
						<div class="btn-group">
							<a class="btn btn-xs" title="查看" data-toggle="modal" data-position="fixed" href="{{ route("core.user-addresses.show", $item->id) }}"><i class="fa fa-eye"></i></a>
							<a class="btn btn-xs" title="编辑" data-toggle="modal" data-position="fixed" href="{{ route("core.user-addresses.edit", $item->id) }}"><i class="fa fa-edit"></i></a>
							<button type="submit" class="btn btn-xs btn-danger" onclick="return confirm('确认删除?')"><i class="fa fa-trash "></i></button>
						</div>
					</form>
				</td>
			</tr>
        @endforeach
        </tbody>
    </table>
    {{ $userAddresses->appends(request()->all())->links('__page') }}
</div>
