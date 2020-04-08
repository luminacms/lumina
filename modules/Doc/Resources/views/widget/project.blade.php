<li>
    <a href="{{route('doc.show',array('id'=>$id))}}" class="box" title="{{$project_name}}" >
        <div class="pull-left imgbox">
            <i class="fa fa-desktop"></i>
        </div>
        <h4>{{$project_name}}</h4>
        <span>共{{$doc_count}}个文档</span>
    </a>
    <p class="summary hidden-xs hidden-sm hidden-md">
        <a href="{{route('doc.show',array('id'=>$id))}}" class="text" >
            {{$description}}
        </a>
    </p>
</li>