<?php
/**
* @name:NotesController
* @uses:use for handling all operation related Notess
* @method:actionList,actionCreate,actionDelete,actionUpdate,actionGet;
* 
*/
class NotesController extends Controller{
   const JSON_RESPONSE_ROOT_SINGLE='note';

/**
* @name:actionCreate
* @uses:use for creating new  Notes
* @param:none
* @return:none
* 
*
*/
	public function actionCreate(){
	    $Notess=$this->getInputAsJson();
	    $model = new Notes();
		$model->setAttributes($Notess[self::JSON_RESPONSE_ROOT_SINGLE], false);
		if (!$model->save()) {
			echo false;
        }      
	}
/**
* @name:actionDelete
* @uses:use for update deleted value of  Notes set delete=0 in Notes table
* @param:$id {{Notes_id}}
* @return:none;
*
*/	
    public function actionDelete($id){
		echo $id;
		$model = Notes::model()->findByPk($id);
		$model->deleted=1;
        $model->save();
		Yii::app()->end();
	}
/**
* @name:actionUpdate
* @uses:use for update Notes
* @param:$id {{Notes_id}}
* @return:json encoded response
*
*/	
	public function actionUpdate($id){
		$Notess=$this->getInputAsJson();
		$model = Notes::model()->findByPk($id);
		$model->setAttributes($Notess[self::JSON_RESPONSE_ROOT_SINGLE], false);
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
* @uses:use for get Notes list for tiers
* @param:$id {{Notes_id}}
* @return:json encoded response
*
*/	
	public function actionGet($id){
		$Notess= Notes::model()->findByPk($id);
		echo '{"gameapp": ' .CJSON::encode($Notess).'}';
        Yii::app()->end();
		}
}