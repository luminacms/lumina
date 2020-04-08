
<div class="table-responsive">
    <table class="table table-hover table-bordered">
        <thead>
            <tr>
				<th>{{ __('main.id') }}</th>
				<th>{{ __('main.create_by') }}</th>
				<th>{{ __('main.status') }}</th>
				<th>{{ __('main.name') }}</th>
				<th>{{ __('main.parentid') }}</th>
				<th>{{ __('main.path') }}</th>
				<th>{{ __('main.level') }}</th>
				<th>{{ __('main.order') }}</th>
				<th>{{ __('main.thumb') }}</th>
				<th>{{ __('main.created_at') }}</th>
				<th>{{ __('main.updated_at') }}</th>
				<th><i class='fa fa-cogs'></i></th>
			</tr>
        </thead>
        <tbody>
        @foreach($productCategories as $item)
            <tr>
				<td>{{ $item->id ?? "" }}</td>
				<td>{{ $item->create_by ?? "" }}</td>
				<td>{{ $item->status ?? "" }}</td>
				<td>{{ $item->name ?? "" }}</td>
				<td>{{ $item->parentid ?? "" }}</td>
				<td>{{ $item->path ?? "" }}</td>
				<td>{{ $item->level ?? "" }}</td>
				<td>{{ $item->order ?? "" }}</td>
				<td>{{ $item->thumb ?? "" }}</td>
				<td>{{ $item->created_at ?? "" }}</td>
				<td>{{ $item->updated_at ?? "" }}</td>
				<td>
					<form method="post" action="{{ route("mall.productCategories.destroy", $item->id) }}">
						<input type="hidden" name="_method" value="DELETE">
						<input type="hidden" name="_token" value="{{ csrf_token() }}">
						<div class="btn-group">
							<a class="btn btn-xs" title="查看" data-toggle="modal" data-position="fixed" href="{{ route("mall.productCategories.show", $item->id) }}"><i class="fa fa-eye"></i></a>
							<a class="btn btn-xs" title="编辑" data-toggle="modal" data-position="fixed" href="{{ route("mall.productCategories.edit", $item->id) }}"><i class="fa fa-edit"></i></a>
							<button type="submit" class="btn btn-xs btn-danger" onclick="return confirm('确认删除?')"><i class="fa fa-trash "></i></button>
						</div>
					</form>
				</td>
			</tr>
        @endforeach
        </tbody>
    </table>
    {{ $productCategories->appends(request()->all())->links('__page') }}
</div>
