
<div class="table-responsive">
    <table class="table table-hover table-bordered">
        <thead>
            <tr>
				<th>{{ __('main.id') }}</th>
				<th>{{ __('main.spu_id') }}</th>
				<th>{{ __('main.attrs') }}</th>
				<th>{{ __('main.thumb') }}</th>
				<th>{{ __('main.pics') }}</th>
				<th>{{ __('main.price_fee') }}</th>
				<th>{{ __('main.market_price_fee') }}</th>
				<th>{{ __('main.status') }}</th>
				<th>{{ __('main.create_by') }}</th>
				<th>{{ __('main.created_at') }}</th>
				<th>{{ __('main.updated_at') }}</th>
				<th><i class='fa fa-cogs'></i></th>
			</tr>
        </thead>
        <tbody>
        @foreach($productSkus as $item)
            <tr>
				<td>{{ $item->id ?? "" }}</td>
				<td>{{ $item->spu_id ?? "" }}</td>
				<td>{{ $item->attrs ?? "" }}</td>
				<td>{{ $item->thumb ?? "" }}</td>
				<td>{{ $item->pics ?? "" }}</td>
				<td>{{ $item->price_fee ?? "" }}</td>
				<td>{{ $item->market_price_fee ?? "" }}</td>
				<td>{{ $item->status ?? "" }}</td>
				<td>{{ $item->create_by ?? "" }}</td>
				<td>{{ $item->created_at ?? "" }}</td>
				<td>{{ $item->updated_at ?? "" }}</td>
				<td>
					<form method="post" action="{{ route("mall.productSkus.destroy", $item->id) }}">
						<input type="hidden" name="_method" value="DELETE">
						<input type="hidden" name="_token" value="{{ csrf_token() }}">
						<div class="btn-group">
							<a class="btn btn-xs" title="查看" data-toggle="modal" data-position="fixed" href="{{ route("mall.productSkus.show", $item->id) }}"><i class="fa fa-eye"></i></a>
							<a class="btn btn-xs" title="编辑" data-toggle="modal" data-position="fixed" href="{{ route("mall.productSkus.edit", $item->id) }}"><i class="fa fa-edit"></i></a>
							<button type="submit" class="btn btn-xs btn-danger" onclick="return confirm('确认删除?')"><i class="fa fa-trash "></i></button>
						</div>
					</form>
				</td>
			</tr>
        @endforeach
        </tbody>
    </table>
    {{ $productSkus->appends(request()->all())->links('__page') }}
</div>
