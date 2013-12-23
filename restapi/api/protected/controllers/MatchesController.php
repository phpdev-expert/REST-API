<?php
class MatchesController extends Controller
{
	  const JSON_RESPONSE_ROOT_SINGLE='match';
	  
	public function actionCreate()
	{
		$consoles=$this->getInputAsJson();
		$consoles[self::JSON_RESPONSE_ROOT_SINGLE]['match_time']=date("Y-m-d H:i:s",strtotime($consoles[self::JSON_RESPONSE_ROOT_SINGLE]['match_time']));
		$model = new Matches();
		$model->setAttributes($consoles[self::JSON_RESPONSE_ROOT_SINGLE], false);
        $response = array(self::JSON_RESPONSE_ROOT_SINGLE => $model);
		if (!$model->save()) {
            $this->sendResponse(401);
        }
        $this->sendResponse(200, CJSON::encode($response));
        Yii::app()->end();
	}

	public function actionGet($id)
	{
		$Criteria = new CDbCriteria();
		$Criteria->condition = "deleted=0 and match_id=".$id;
		
		$Criteriax = new CDbCriteria();   	
		$Criteriax->condition = "deleted=0 and note_type=1 and note_ref=".$id;
		$users=Matches::model()->findAll($Criteria);
		$notes=Notes::model()->findAll($Criteriax);
		foreach($users as $gm)
		{
			    $row['competition_id']=$gm->competition_id;
				$row['match_time']=date("d/m/Y H:i:s",strtotime($gm->match_time));
		$row['match_timen']=date("m/d/Y H:i",strtotime($gm->match_time));
				$row['team1_id']=$gm->team1_id;
				$row['team2_id']=$gm->team2_id;
				$row['winner']=$gm->winner;
				$row['result_summary']=$gm->result_summary;
				$row['result_detail']=$gm->result_detail;
				$row['team1_score']=$gm->team1_score;
				$row['team2_score']=$gm->team2_score;
				$row['team1_acceptance']=$gm->team1_acceptance;
				$row['team2_acceptance']=$gm->team2_acceptance;
		$row['notes']=$notes;
		$ban_user[] = $row;
		}

		
        echo '{"gameapp": ' .CJSON::encode($ban_user).'}';
        Yii::app()->end();
		
		       
	}

	public function actionList()
	{
		
		$Criteria = new CDbCriteria();
		$Criteria->condition = "deleted=0";
		$users=Matches::model()->findAll($Criteria);
		foreach($users as $gm)
		{	
		$row['match_id']=$gm->match_id;
		$row['competition_id']=Competitions::model()->findByPk($gm->competition_id);
		$row['match_time']=date("d/m/Y H:i:s",strtotime($gm->match_time));
		$row['match_timen']=date("m/d/Y H:i",strtotime($gm->match_time));
		$tm1=Teams::model()->findByPk($gm->team1_id);
		$tm2=Teams::model()->findByPk($gm->team2_id);
		$row['team1_id']=$tm1;
		$row['team2_id']=$tm2;
		$row['winner']=$gm->winner;
		$row['result_summary']=$gm->result_summary; 	
	    $row['team1_score']=$gm->team1_score; 	
	    $row['team2_score']=$gm->team2_score; 	
        $row['team1_acceptance']=$gm->team1_acceptance; 	
	    $row['team2_acceptance']=$gm->team2_acceptance; 	
	    $row['match_completed']=$gm->match_completed;
		 $team[] = $row;	 	 	 	 
		}
		$this->sendResponse(200,  '{"gameapp": ' .CJSON::encode($team).'}');
        Yii::app()->end();
	}

	public function actionUpdate($id)
	{
		$consoles=$this->getInputAsJson();
		$model = Matches::model()->findByPk($id);
		$consoles[self::JSON_RESPONSE_ROOT_SINGLE]['match_time']=date("Y-m-d H:i:s",strtotime($consoles[self::JSON_RESPONSE_ROOT_SINGLE]['match_time']));
		$model->setAttributes($consoles[self::JSON_RESPONSE_ROOT_SINGLE], false);
        $response = array(self::JSON_RESPONSE_ROOT_SINGLE => $model);
		if ($model->save()) {
           echo CJSON::encode($response);
        }
        Yii::app()->end();
	}
	
	public function actionDelete($id)
	{
			echo $id;
		$model = Matches::model()->findByPk($id);
		$model->deleted=1;
        if (!$model)
            $this->sendResponse(404);
        if (!$model->save()) {
            $this->sendResponse(401);
        }
        $this->sendResponse(200);
        Yii::app()->end();
	}
	
}