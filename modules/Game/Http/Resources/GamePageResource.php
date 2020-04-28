<?php

namespace Modules\Game\Http\Resources;

use Modules\Core\Http\Resources\BaseResource;

class GamePageResource extends BaseResource
{
    public function toArray($request)
    {
        if(!$request->get('uid')){
            return [
                'id' => $this->id,
                'uid' => $this->uid,
                'game_id' => $this->game_id,
                'slug' => $this->slug,
                'title' => $this->title,
                'count' => $this->count,
                'mode' => $this->mode,
                'status' => $this->status,
                'created_at' => $this->created_at,
                'visible' => true
            ];
        }else{
            return [
                'id' => $this->id,
                'uid' => $this->uid,
                'game_id' => $this->game_id,
                'slug' => $this->slug,
                'title' => $this->title,
                'count' => $this->count,
                'mode' => $this->mode,
                'status' => $this->status,
                'diy_content' => $this->diy_content,
                'content' => $this->content,
                'created_at' => $this->created_at,
                'visible' => true
            ];
        }
        
    }
}
