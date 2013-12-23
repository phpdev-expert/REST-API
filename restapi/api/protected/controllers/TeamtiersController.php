<?php

class TeamtiersController extends Controller
{
   const JSON_RESPONSE_ROOT_SINGLE='team';
   const JSON_RESPONSE_ROOT_PLURAL='teams';
	
		public function actionUpdate($id){
		$consoles=$this->getInputAsJson();
		$udx=$consoles[self::JSON_RESPONSE_ROOT_SINGLE]['tier_id'];
		$sql="update {{teamtiers}} set tier_id='$udx' where team_id='$id'";
		$users=Yii::app()->db->createCommand($sql)->query();
        $response ="updated";
        echo CJSON::encode($response);
        Yii::app()->end();
	}

}