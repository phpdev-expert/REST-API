<?php

class FixturesController extends Controller
{
	
	const JSON_RESPONSE_ROOT_SINGLE='fixtur';
	public function actionGet($id)
	{
		$Criteria = new CDbCriteria();
		$Criteria->condition = "deleted=0 and competition_id=".$id;
		$users=Fixtures::model()->findAll($Criteria);
		
		/*foreach($users as $gm)
		{	 		 	 	 	
		$row['game_time']=date("d/m/Y H:i:s",strtotime($gm->game_time));
		$usersx[]=$row;
		}*/
		 echo '{"gameapp": ' .CJSON::encode($users).'}';
        Yii::app()->end();
	}

	public function actionUpdate($id)
	{
		$games=$this->getInputAsJson();
		$sql="delete from {{fixtures}} where competition_id='$id'";
		$users=Yii::app()->db->createCommand($sql)->query();
	    $teammem=$games[self::JSON_RESPONSE_ROOT_SINGLE]['fixture'];
		foreach($teammem as $t){
		  $model = new Fixtures();
		  $teamm['teammem']['competition_id']=$id; 
		  $teamm['teammem']['game_time']=$t;	
		  $model->setAttributes($teamm['teammem'], false);
		  $model->save();
		}
	}


}