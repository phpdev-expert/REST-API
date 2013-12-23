<?php
class CompetitionsController extends Controller
{
	const JSON_RESPONSE_ROOT_SINGLE='compet';
	public function actionList()
	{
		$Criteria = new CDbCriteria();
		$Criteria->condition = "deleted=0";
		$users=Competitions::model()->findAll($Criteria);
		foreach($users as $gm)
		{	 	 
	    $row['competition_id']=$gm->competition_id;
		$row['competition_name']=$gm->competition_name;
		
		$tr=Tiers::model()->findByPk($gm->tier_id);
		$gms=Game::model()->findByPk($tr['game_id']);
		$cn=Console::model()->findByPk($gms['console_id']);
		
		$Criteria = new CDbCriteria();
		$Criteria->condition = "competition_id=".$gm->competition_id;
		$fx=Fixtures::model()->findAll($Criteria);
		$fxx=array();
		foreach($fx as $fe)
		{
			$cx['game_time']=date("d/m/Y H:i:s",strtotime($fe->game_time));
			$fxx[]=$cx;
		}
		$row['tier']=$tr;
		$row['game']=$gms;
		$row['console']=$cn;
		$row['fixtures']=$fxx;
		$row['can_join']=$gm->can_join;
		$row['active']=$gm->active;
	    $ban_user[] = $row;
		}
        echo '{"gameapp": ' .CJSON::encode($ban_user).'}';
        Yii::app()->end();
	}
	

	
	public function actionCreate()
	{
		$games=$this->getInputAsJson();
	    $model = new Competitions();
		$model->setAttributes($games[self::JSON_RESPONSE_ROOT_SINGLE], false);
		if (!$model->save()) {
			echo false;
        }    
		
	}
	
	public function actionUpdate($id)
	{
		$consoles=$this->getInputAsJson();
		$model = Competitions::model()->findByPk($id);
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
		$model = Competitions::model()->findByPk($id);
		$model->deleted=1;
		if (!$model)
            $this->sendResponse(404);
        if (!$model->save()) {
            $this->sendResponse(401);
        }
        $this->sendResponse(200);
        $this->sendResponse(200);
        Yii::app()->end();
	}
	
		public function actionGet($id){
		
			  $model = Competitions::model()->findByPk($id);
			  $tr=Tiers::model()->findByPk($model['tier_id']);
			  $row['tier_id']=$model['tier_id'];
			  $row['players_per_team']=$model['players_per_team'];
		      $row['points_detail']=$model['points_detail'];
	          $row['rules_detail']=$model['rules_detail'];
		      $row['prizes_detail']= $model['prizes_detail'];
		      $row['other_detail']= $model['other_detail'];
			  $row['competition_name']= $model['competition_name'];
			  $row['game_id']=$tr['game_id'];
			  echo '{"gameapp": ' .CJSON::encode($row).'}';
              Yii::app()->end();
		
		}
	

	
}