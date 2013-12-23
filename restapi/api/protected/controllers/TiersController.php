<?php
/**
* @name:UserController
* @uses:use for handling all operation related User
* @method:actionList;
* 
*/
class TiersController extends Controller
{
   const JSON_RESPONSE_ROOT_SINGLE='tier';
   const JSON_RESPONSE_ROOT_PLURAL='tiers';
/**
* @name:actionList
* @uses:use for listing Tiers
* @param:none
* @return:json encoded list of all Tiers 
*
*/
	public function actionList(){
		$sql="SELECT a.*,b.game_name,c.console_name FROM {{tiers}} a, {{games}} b,{{consoles}} c where a.game_id =b.game_id and c.console_id=b.console_id and a.deleted=0 ORDER BY c.console_name,b.game_name,a.sort_order ";
		$users=Yii::app()->db->createCommand($sql)->queryAll();
        echo '{"gameapp": ' .CJSON::encode($users).'}';
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
	    $model = new Tiers();
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
		
		$model = Tiers::model()->findByPk($id);
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
		$model = Tiers::model()->findByPk($id);
		$model->setAttributes($consoles[self::JSON_RESPONSE_ROOT_SINGLE], false);
        $response = array(self::JSON_RESPONSE_ROOT_SINGLE => $model);
		if ($model->save()) {
           echo CJSON::encode($response);
        }
        Yii::app()->end();
	}
	
	/**
* @name:actionGet
* @uses:use for  Tier list
* @param:$id {{game_id}}
* @return:json encoded response
*
*/
		public function actionGet($id){
        $Criteria = new CDbCriteria();
		$Criteria->condition = "deleted =0 and game_id='".$id."'" ;
		$game= Tiers::model()->findAll($Criteria);
       echo '{"gameapp": ' .CJSON::encode($game).'}';
        Yii::app()->end();
	}
	
		
}