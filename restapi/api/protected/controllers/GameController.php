<?php
/**
* @name:GameController
* @uses:use for handling all operation related games
* @method:actionList,actionCreate,actionDelete,actionUpdate,actionGet;
* 
*/
class GameController extends Controller{
   const JSON_RESPONSE_ROOT_SINGLE='game';
   const JSON_RESPONSE_ROOT_PLURAL='games';
   /**
* @name:actionList
* @uses:use for listing Console and related games
* @param:none
* @return:json encoded list of all Consoles and related games 
*
*/
	public function actionList(){
		$Criteria = new CDbCriteria();
		$Criteria->condition = "deleted =0";
		$game= Game::model()->findAll($Criteria);
		$arr=array();
		foreach($game as $gm)
		{	 	 	 	 	 	
		$row['game_id']=$gm->game_id;
		$row['game_name']=$gm->game_name;
		$row['console_id']=$gm->console_id;
		$row['active']=$gm->active;
		$row['time_updated']=$gm->time_updated;
		$row['time_inserted']=$gm->time_inserted;
		$row['deleted']=$gm->deleted;
		$Criteria = new CDbCriteria();
		$Criteria->condition = "console_id = $gm->console_id";
		$cn=Console::model()->findAll($Criteria);
		$row['console']=$cn;
		$games[] = $row;
		}
       echo '{"gameapp": ' .CJSON::encode($games).'}';
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
	    $model = new Game();
		$model->setAttributes($games[self::JSON_RESPONSE_ROOT_SINGLE], false);
		if (!$model->save()) {
			echo false;
        }      
	}
/**
* @name:actionDelete
* @uses:use for update deleted value of  game set delete=0 in game table
* @param:$id {{game_id}}
* @return:none;
*
*/	
    public function actionDelete($id){
		echo $id;
		$model = Game::model()->findByPk($id);
		$model->deleted=1;
        $model->save();
		Yii::app()->end();
	}
/**
* @name:actionUpdate
* @uses:use for update game
* @param:$id {{game_id}}
* @return:json encoded response
*
*/	
	public function actionUpdate($id){
		$games=$this->getInputAsJson();
		$model = Game::model()->findByPk($id);
		$model->setAttributes($games[self::JSON_RESPONSE_ROOT_SINGLE], false);
        $response = array(self::JSON_RESPONSE_ROOT_SINGLE => $model);
		if (!$model)
            $this->sendResponse(404);
		if (!$model->save()) {
            $this->sendResponse(401);
        }
        $this->sendResponse(200, CJSON::encode($response));
        Yii::app()->end();
	}
	
	/**
* @name:actionGet
* @uses:use for get game list for tiers
* @param:$id {{game_id}}
* @return:json encoded response
*
*/	
	public function actionGet($id){
		
	    $Criteria = new CDbCriteria();
		if($id)
		$Criteria->condition = "game_id =".$id;
		else
		$Criteria->condition = "deleted =0";	
		$games= Game::model()->findAll($Criteria);
		echo '{"gameapp": ' .CJSON::encode($games).'}';
        Yii::app()->end();
		}
}