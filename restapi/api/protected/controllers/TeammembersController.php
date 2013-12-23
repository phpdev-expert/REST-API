<?php

class TeammembersController extends Controller
{
 const JSON_RESPONSE_ROOT_SINGLE='team';
   const JSON_RESPONSE_ROOT_PLURAL='teams';
	
		public function actionUpdate($id){
		$consoles=$this->getInputAsJson();
		$model = Teammembers::model()->findByPk($id);
		$model->setAttributes($consoles[self::JSON_RESPONSE_ROOT_SINGLE], false);
        $response = array(self::JSON_RESPONSE_ROOT_SINGLE => $model);
		if ($model->save()) {
           echo CJSON::encode($response);
        }
        Yii::app()->end();
	}
	

	public function actionCreate(){
	    $games=$this->getInputAsJson();
		$teammem=$games[self::JSON_RESPONSE_ROOT_SINGLE]['team_member'];
		$team_id=$games[self::JSON_RESPONSE_ROOT_SINGLE]['team_id'];
		foreach($teammem as $t){
	      $sql="delete  from {{teammembers}} where user_id='$t' and team_id='$team_id'";
		  Yii::app()->db->createCommand($sql)->query();
		  $teamm['teammem']['user_id']=$t; 
		  $teamm['teammem']['team_id']=$team_id;
		  $teamm['teammem']['joined_time']=date('Y-m-d'); 
		  
		  $model = new Teammembers();	
		  $model->setAttributes($teamm['teammem'], false);
		  $model->save();
		}
	  
	}


	/**
* @name:actionDelete
* @uses:use for update deleted value of  Tier set delete=0 in tiers table
* @param:$id {{tier_id}}
* @return:none;
*
*/
    public function actionDelete($id){
		echo $id;
		$model = Teammembers::model()->findByPk($id);
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