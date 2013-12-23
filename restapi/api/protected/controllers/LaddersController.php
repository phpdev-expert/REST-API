<?php

class LaddersController extends Controller
{
	const JSON_RESPONSE_ROOT_SINGLE='lader';
	
    public function actionCreate()
	{
		$consoles=$this->getInputAsJson();
		$model = new Ladders();
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
		$model = Ladders::model()->findByPk($id);
		$this->sendResponse(200, '{"gameapp": ' .CJSON::encode($model).'}');
        Yii::app()->end();
	}

	public function actionList()
	{
	         
		$Criteria = new CDbCriteria();
		$Criteria->condition = "deleted=0";
		$users=Ladders::model()->findAll($Criteria);
		foreach($users as $gm)
		{	
		
		$row['ladder_id']=$gm->ladders_id; 
		$row['competition_id']=Competitions::model()->findByPk($gm->competition_id);
		$tm1=Teams::model()->findByPk($gm->team_id);
		$row['team_id']=$tm1;
		$row['matches_played']=$gm->matches_played; 
		$row['match_wins']=$gm->match_wins; 
		$row['match_losses']=$gm->match_losses; 	
		$row['match_draws']=$gm->match_draws; 	
		$row['match_points_for']=$gm->match_points_for;
		$row['match_points_against']=$gm->match_points_against; 
		$row['ladder_points']=$gm->ladder_points;
		$team[] = $row;	 	 	 	 
		}
		$this->sendResponse(200,  '{"gameapp": ' .CJSON::encode($team).'}');
        Yii::app()->end();	
	}

	
	public function actionUpdate($id)
	{
			$consoles=$this->getInputAsJson();
		$model = Ladders::model()->findByPk($id);
		
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
		$model = Ladders::model()->findByPk($id);
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