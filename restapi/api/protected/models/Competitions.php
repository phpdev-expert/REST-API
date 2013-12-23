<?php

/**
 * This is the model class for table "{{competitions}}".
 *
 * The followings are the available columns in table '{{competitions}}':
 * @property string $competition_id
 * @property string $tier_id
 * @property integer $players_per_team
 * @property string $points_detail
 * @property string $rules_detail
 * @property string $prizes_detail
 * @property string $other_detail
 * @property integer $active
 * @property string $time_inserted
 * @property string $time_updated
 * @property integer $deleted
 */
class Competitions extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return '{{competitions}}';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('players_per_team, active, deleted', 'numerical', 'integerOnly'=>true),
			array('tier_id', 'length', 'max'=>20),
			array('points_detail, rules_detail, prizes_detail, other_detail, time_inserted, time_updated', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('competition_id, tier_id, players_per_team, points_detail, rules_detail, prizes_detail, other_detail, active, time_inserted, time_updated, deleted', 'safe', 'on'=>'search'),
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
			'competition_id' => 'Competition',
			'tier_id' => 'Tier',
			'players_per_team' => 'Players Per Team',
			'points_detail' => 'Points Detail',
			'rules_detail' => 'Rules Detail',
			'prizes_detail' => 'Prizes Detail',
			'other_detail' => 'Other Detail',
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

		$criteria->compare('competition_id',$this->competition_id,true);
		$criteria->compare('tier_id',$this->tier_id,true);
		$criteria->compare('players_per_team',$this->players_per_team);
		$criteria->compare('points_detail',$this->points_detail,true);
		$criteria->compare('rules_detail',$this->rules_detail,true);
		$criteria->compare('prizes_detail',$this->prizes_detail,true);
		$criteria->compare('other_detail',$this->other_detail,true);
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
	 * @return Competitions the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
