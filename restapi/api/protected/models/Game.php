<?php

/**
 * This is the model class for table "{{games}}".
 *
 * The followings are the available columns in table '{{games}}':
 * @property string $game_id
 * @property string $game_name
 * @property string $console_id
 * @property integer $active
 * @property string $time_inserted
 * @property string $time_updated
 * @property integer $deleted
 */
class Game extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return '{{games}}';
	}


	
	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('active, deleted', 'numerical', 'integerOnly'=>true),
			array('game_name', 'length', 'max'=>100),
			array('game_name, console_id', 'required'),
			array('console_id', 'length', 'max'=>20),
			array('time_inserted, time_updated', 'safe'),
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
			'game_id' => 'Game',
			'game_name' => 'Game Name',
			'console_id' => 'Console',
			'active' => 'Active',
			'time_inserted' => 'Time Inserted',
			'time_updated' => 'Time Updated',
			'deleted' => 'Deleted',
		);
	}



	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Games the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
