<?php
/**
* @name:UserbansController
* @uses:use for handling all operation related User
* @method:actionList;
* 
*/
class UserbansController extends Controller
{
   const JSON_RESPONSE_ROOT_SINGLE='userban';
   const JSON_RESPONSE_ROOT_PLURAL='userbans';
/**
* @name:actionList
* @uses:use for listing Tiers
* @param:none
* @return:json encoded list of all Tiers 
*
*/
	public function actionList(){
		$Criteria = new CDbCriteria();
		$Criteria->condition = "deleted=0";
		$users=Userbans::model()->findAll($Criteria);
		foreach($users as $gm)
		{	 		 	 	 	
		$row['ban_id']=$gm->ban_id;
		$row['user_id']=$gm->user_id;
		$row['ban_all']=$gm->ban_all;
		$row['ban_reason']=$gm->ban_reason;
		$row['ban_console']=$gm->ban_console;
		$row['ban_game']=$gm->ban_game;
		$row['ban_start']=date('d/m/Y',strtotime($gm->ban_start));
		$row['ban_end']=date('d/m/Y',strtotime($gm->ban_end));
		$row['banned_by']=$gm->banned_by;
		$bus=User::model()->findByPk($gm->banned_by);
		$row['banned_by']=$bus;
		
		
		
		$us=User::model()->findByPk($gm->user_id);
		$row['user_id']=$us;
		
		if($gm->ban_console){
		$Criteria = new CDbCriteria();
		$Criteria->condition = "console_id = $gm->ban_console";
		$cn=Game::model()->findAll($Criteria);
		$cnx=Console::model()->findByPk($gm->ban_console);
		$row['console']=$cnx;
		$row['limits']=$cn;
		$row['type']="Console";
		}
		else if($gm->ban_game){
		$Criteria = new CDbCriteria();
		$Criteria->condition = "game_id = $gm->ban_game";
		$cn=Game::model()->findAll($Criteria);
		$row['limits']=$cn;
		$row['type']="Game";
		}else{
		$row['limits']="N/A";
		$row['type']="All";
		}
		$ban_user[] = $row;
		}
        echo '{"gameapp": ' .CJSON::encode($ban_user).'}';
        Yii::app()->end();
	}
	
/**
* @name:actionCreate
* @uses:use for creating new  Tiers
* @param:none
* @return:none
* 
*
*/
	public function actionCreate(){
	    $games=$this->getInputAsJson();
	    $model = new Userbans();
	    $games[self::JSON_RESPONSE_ROOT_SINGLE]['ban_start'];
		$games[self::JSON_RESPONSE_ROOT_SINGLE]['ban_end'];
		$model->setAttributes($games[self::JSON_RESPONSE_ROOT_SINGLE], false);
		if (!$model->save()) {
			echo false;
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
		$model = Userbans::model()->findByPk($id);
		$model->deleted=1;
        if (!$model)
            $this->sendResponse(404);
        if (!$model->save()) {
            $this->sendResponse(401);
        }
        $this->sendResponse(200);
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
		$model = Userbans::model()->findByPk($id);
		$model->setAttributes($consoles[self::JSON_RESPONSE_ROOT_SINGLE], false);
        $response = array(self::JSON_RESPONSE_ROOT_SINGLE => $model);
		if ($model->save()) {
           echo CJSON::encode($response);
        }
        Yii::app()->end();
	}
	
	/**
* @name:actionList
* @uses:use for listing Tiers
* @param:none
* @return:json encoded list of all Tiers 
*
*/
	public function actionGet($id){
		$Criteria = new CDbCriteria();
		$Criteria->condition = "deleted=0 and ban_id=".$id;
		
		$Criteriax = new CDbCriteria();   	
		$Criteriax->condition = "deleted=0 and note_type=2 and note_ref=".$id;
		$users=Userbans::model()->findAll($Criteria);
		$notes=Notes::model()->findAll($Criteriax);
		foreach($users as $gm)
		{	 		 	 	 	
		$row['ban_id']=$gm->ban_id;
		$row['user_id']=$gm->user_id;
		$row['ban_all']=$gm->ban_all;
		$row['ban_console']=$gm->ban_console;
		$row['ban_reason']=$gm->ban_reason;
		$row['ban_game']=$gm->ban_game;
		$row['ban_start']=date('d/m/Y',strtotime($gm->ban_start));
		$row['ban_end']=date('d/m/Y',strtotime($gm->ban_end));
		$row['banned_by']=$gm->banned_by;
		$row['notes']=$notes;
		$ban_user[] = $row;
		}

		
        echo '{"gameapp": ' .CJSON::encode($ban_user).'}';
        Yii::app()->end();
		}

}