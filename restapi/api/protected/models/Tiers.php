<?php

/**
 * This is the model class for table "{{tiers}}".
 *
 * The followings are the available columns in table '{{tiers}}':
 * @property string $tier_id
 * @property string $game_id
 * @property string $tier_name
 * @property integer $sort_order
 * @property integer $active
 * @property string $time_inserted
 * @property string $time_updated
 * @property integer $deleted
 */
class Tiers extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return '{{tiers}}';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('sort_order, active, deleted', 'numerical', 'integerOnly'=>true),
			array('game_id', 'length', 'max'=>20),
			array('tier_name', 'length', 'max'=>100),
			array('time_inserted, time_updated', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('tier_id, game_id, tier_name, sort_order, active, time_inserted, time_updated, deleted', 'safe', 'on'=>'search'),
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
			'tier_id' => 'Tier',
			'game_id' => 'Game',
			'tier_name' => 'Tier Name',
			'sort_order' => 'Sort Order',
			'active' => 'Active',
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

		$criteria->compare('tier_id',$this->tier_id,true);
		$criteria->compare('game_id',$this->game_id,true);
		$criteria->compare('tier_name',$this->tier_name,true);
		$criteria->compare('sort_order',$this->sort_order);
		$criteria->compare('active',$this->active);
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
	 * @return Tiers the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
