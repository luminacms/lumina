<?php


namespace Modules\Vote\Http\Controllers\Interfaces;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Payment\Exceptions\Exception;
use Modules\Vote\Exports\VoteExport;
use Modules\Vote\Http\Requests\VoteRequest;
use Modules\Vote\Http\Resources\VoteResource;
use Modules\Vote\Models\Vote;
use Modules\Vote\Models\VoteOption;
use Modules\Vote\Models\VoteSubject;

class VotesController extends BaseController
{

    protected $repository;

    public function __construct(Vote $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param Request $request
     * @return mixed
     * @throws \Prettus\Repository\Exceptions\RepositoryException
     */
    public function index($id, Request $request)
    {
        $vote = $this->repository->find($id);
        return $this->toResource($vote, VoteResource::class);
    }

    public function rank($id, VoteRequest $request)
    {
        $rank = VoteOption::getRank($id, $request->get('sid'));
        return $this->toResponse(array_values($rank));
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function export($id, Request $request)
    {
        return $this->toAjaxExport(new VoteExport($request->get('ids'), ['vote_id'=>$id]));
    }


    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function subjectStore($id, Request $request)
    {
        $vote = Vote::findOrFail($id);
        $vote->update($request->all());
        foreach ($request->get('subjects') as $_k => $_req) {

            DB::transaction(function () use($vote, $_k, $_req) {
                $_data = [
                    'vote_id' => $vote->id,
                    'type' => $_req['type']??'text',
                    'title' => $_req['title'],
                    'tip' => $_req['tip'],
                    'score' => 0,
                    'sort' => $_k+1,
                    'required' => isset($_req['required'])&&$_req['required']=='true'?1:0,
                    'right_option' => '选项1'
                ];
                if(isset($_req['subject_id'])) {
                    $subject = VoteSubject::find($_req['subject_id']);
                    $subject->fill($_data);
                    $subject->save();
                }else{
                    $subject = VoteSubject::create($_data);
                }
                foreach ($_req['options'] as $_opt) {
                    if(isset($_opt['option_id'])) {
                        $exsi = VoteOption::find($_opt['option_id']);
                        $exsi->fill($_opt);
                        $exsi->save();
                    }else{
                        $exsi = VoteOption::where([
                            ['value', $_opt['value']],
                            ['vote_id', $vote->id],
                            ['subject_id', $subject->id],
                        ])->exists();
                        if(!$exsi) {
                            VoteOption::create([
                                'vote_id' => $vote->id,
                                'subject_id' => $subject->id,
                                'value' => $_opt['value'],
                                'type' => $_opt['type']
                            ]);
                        }
                    }
                }
            });

        }
        return $this->toResource($vote, VoteResource::class, '保存成功');
    }


    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function subjectDelete($id, Request $request)
    {
        $request->validate(['subject_id' => 'required']);
        $vote = Vote::findOrFail($id);
//        $this->authorize('delete', $vote);

        try{
            VoteSubject::find($request->get('subject_id'))->delete();
            return $this->toResource($vote, VoteResource::class, '删除成功');
        }catch (Exception $e){
            return $this->toException($e);
        }
    }
}
