<?php

/**
 * This is the model class for table "{{userbans}}".
 *
 * The followings are the available columns in table '{{userbans}}':
 * @property string $ban_id
 * @property string $user_id
 * @property integer $ban_all
 * @property string $ban_console
 * @property string $ban_game
 * @property string $ban_start
 * @property string $ban_end
 * @property string $ban_reason
 * @property string $banned_by
 * @property string $time_inserted
 * @property string $time_updated
 * @property integer $deleted
 */
class Userbans extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return '{{userbans}}';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('ban_all, deleted', 'numerical', 'integerOnly'=>true),
			array('user_id, ban_console, ban_game, banned_by', 'length', 'max'=>20),
			array('ban_reason', 'length', 'max'=>250),
			array('ban_start, ban_end, time_inserted, time_updated', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('ban_id, user_id, ban_all, ban_console, ban_game, ban_start, ban_end, ban_reason, banned_by, time_inserted, time_updated, deleted', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'ban_id' => 'Ban',
			'user_id' => 'User',
			'ban_all' => 'Ban All',
			'ban_console' => 'Ban Console',
			'ban_game' => 'Ban Game',
			'ban_start' => 'Ban Start',
			'ban_end' => 'Ban End',
			'ban_reason' => 'Ban Reason',
			'banned_by' => 'Banned By',
			'time_inserted' => 'Time Inserted',
			'time_updated' => 'Time Updated',
			'deleted' => 'Deleted',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('ban_id',$this->ban_id,true);
		$criteria->compare('user_id',$this->user_id,true);
		$criteria->compare('ban_all',$this->ban_all);
		$criteria->compare('ban_console',$this->ban_console,true);
		$criteria->compare('ban_game',$this->ban_game,true);
		$criteria->compare('ban_start',$this->ban_start,true);
		$criteria->compare('ban_end',$this->ban_end,true);
		$criteria->compare('ban_reason',$this->ban_reason,true);
		$criteria->compare('banned_by',$this->banned_by,true);
		$criteria->compare('time_inserted',$this->time_inserted,true);
		$criteria->compare('time_updated',$this->time_updated,true);
		$criteria->compare('deleted',$this->deleted);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Userbans the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
