<?php

class TeamsController extends Controller
{
   const JSON_RESPONSE_ROOT_SINGLE='team';
   const JSON_RESPONSE_ROOT_PLURAL='teams';
	public function actionList()
	{
		$Criteria = new CDbCriteria();
		$Criteria->condition = "deleted=0";
		$users=Teams::model()->findAll($Criteria);
		foreach($users as $gm)
		{	
		$sql="SELECT a.user_id ,a.team_member_id, a.team_id, b.user_login FROM {{teammembers}} a, wp_users b WHERE a.deleted=0 and  a.user_id = b.ID AND a.team_id=".$gm->team_id;	 	 	 		 	
		$teamm=Yii::app()->db->createCommand($sql)->queryAll();
		$row['team_mem']=$teamm;
		$row['captain_user_id']=$gm->captain_user_id;
		$row['team_id']=$gm->team_id;
		$row['team_name']=$gm->team_name;
		$cnx=Game::model()->findByPk($gm->game_id);
		$row['game_id']=$cnx;
		$cn=Console::model()->findByPk($cnx['console_id']);
		$row['console']=$cn;
		$cnt=Teamtiers::model()->find('team_id=:team_id', array(':team_id'=>$gm->team_id));
		$cntr=Tiers::model()->findByPk($cnt['tier_id']);
		$row['tier']=$cntr;
		$team[] = $row;
		}
        echo '{"gameapp": ' .CJSON::encode($team).'}';
        Yii::app()->end();
	}
	
	
	/**
* @name:actionUpdate
* @uses:use for update Tier
* @param:$id {{tier_id}}
* @return:json encoded response
*
*/
		public function actionUpdate($id){
		$consoles=$this->getInputAsJson();
		$model = Teams::model()->findByPk($id);
		$model->setAttributes($consoles[self::JSON_RESPONSE_ROOT_SINGLE], false);
        $response = array(self::JSON_RESPONSE_ROOT_SINGLE => $model);
		if ($model->save()) {
           echo CJSON::encode($response);
        }
        Yii::app()->end();
	}
	
	/**
* @name:actionCreate
* @uses:use for creating new  game
* @param:none
* @return:none
* 
*
*/
	public function actionCreate(){
	    $games=$this->getInputAsJson();
	    $model = new Teams();
		
		$team[self::JSON_RESPONSE_ROOT_SINGLE]['team_name']=$games[self::JSON_RESPONSE_ROOT_SINGLE]['team_name'];
		
		$team[self::JSON_RESPONSE_ROOT_SINGLE]['game_id']=$games[self::JSON_RESPONSE_ROOT_SINGLE]['game_id'];
		
		$model->setAttributes($games[self::JSON_RESPONSE_ROOT_SINGLE], false);
		if (!$model->save()) {
			echo "error on team";
        }   
		$team_id=$model->team_id;
		
		
/**
* 
* use:save tire
* 
*/
 
     $model = new Teamtiers();
		$teamter['teamtier']['tier_id']=$games[self::JSON_RESPONSE_ROOT_SINGLE]['tier_id']; 
		$teamter['teamtier']['team_id']=$team_id; 
		$model->setAttributes($teamter['teamtier'], false);
		if (!$model->save()) {
			echo "error on tier";
        }   


		$teammem=$games[self::JSON_RESPONSE_ROOT_SINGLE]['team_member'];
		$model = new Teammembers();
		foreach($teammem as $t){
		  $model = new Teammembers();
		  $teamm['teammem']['user_id']=$t; 
		  $teamm['teammem']['team_id']=$team_id;
		  $teamm['teammem']['joined_time']=date('Y-m-d'); 	
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
		$model = Teams::model()->findByPk($id);
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