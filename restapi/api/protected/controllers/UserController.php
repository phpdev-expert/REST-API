<?php
/**
* @name:UserController
* @uses:use for handling all operation related User
* @method:actionList;
* 
*/
class UserController extends Controller
{
   const JSON_RESPONSE_ROOT_SINGLE='user';
   const JSON_RESPONSE_ROOT_PLURAL='users';
   /**
* @name:actionList
* @uses:use for listing users
* @param:none
* @return:json encoded list of all users 
*
*/
	public function actionList(){
		$Criteria = new CDbCriteria();
		$Criteria->condition = "user_status=0";
		$user= User::model()->findAll($Criteria);
        echo '{"gameapp": ' .CJSON::encode($user).'}';
        Yii::app()->end();
	}
}