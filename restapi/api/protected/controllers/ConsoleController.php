<?php
/**
* @name:ConsoleController
* @uses:use for handling all operation related Console
* @method:actionList,actionCreate,actionDelete,actionUpdate;
* 
*/
class ConsoleController extends Controller{
   const JSON_RESPONSE_ROOT_SINGLE='console';
   const JSON_RESPONSE_ROOT_PLURAL='consoles';
   
/**
* @name:actionList
* @uses:use for listing Console and related games
* @param:none
* @return:json encoded list of all Consoles and related games 
*
*/
	public function actionList(){
		$Criteria = new CDbCriteria();
		$Criteria->condition = "deleted=0";
		$console= Console::model()->findAll($Criteria);
		foreach($console as $gm)
		{	 	 	 	 	 	
		$row['console_id']=$gm->console_id;
		$row['console_name']=$gm->console_name;
		$row['active']=$gm->active;
		$row['time_updated']=$gm->time_updated;
		$row['time_inserted']=$gm->time_inserted;
		$row['deleted']=$gm->deleted;
		$Criteria = new CDbCriteria();
		$Criteria->condition = "console_id = $gm->console_id";
		$Criteria->order="game_name";
		$gm=Game::model()->findAll($Criteria);
		$row['game']=$gm;
		$consoles[] = $row;
		}
       echo '{"gameapp": ' .CJSON::encode($consoles).'}';
        Yii::app()->end();
	}
/**
* @name:actionCreate
* @uses:use for creating new  Console
* @param:none
* @return:json encode reponse
* 
*
*/
		public function actionCreate(){
		$consoles=$this->getInputAsJson();
		$model = new Console();
		$model->setAttributes($consoles[self::JSON_RESPONSE_ROOT_SINGLE], false);
        $response = array(self::JSON_RESPONSE_ROOT_SINGLE => $model);
		if (!$model->save()) {
            $this->sendResponse(401);
        }
        $this->sendResponse(200, CJSON::encode($response));
        Yii::app()->end();
	}
/**
* @name:actionDelete
* @uses:use for update deleted value of  Console set delete=0 in Console table
* @param:$id {{console_id}}
* @return:none;
*
*/
    public function actionDelete($id){
		echo $id;
		$model = Console::model()->findByPk($id);
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
* @uses:use for update Console
* @param:$id {{console_id}}
* @return:json encoded response
*
*/
		public function actionUpdate($id){
		$consoles=$this->getInputAsJson();
		$model = Console::model()->findByPk($id);
		$model->setAttributes($consoles[self::JSON_RESPONSE_ROOT_SINGLE], false);
        $response = array(self::JSON_RESPONSE_ROOT_SINGLE => $model);
		if ($model->save()) {
           echo CJSON::encode($response);
        }
        Yii::app()->end();
	}
	
	
	
}