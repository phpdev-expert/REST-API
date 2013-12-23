<?php

/**
 * This is the model class for table "{{fixtures}}".
 *
 * The followings are the available columns in table '{{fixtures}}':
 * @property string $fixture_id
 * @property string $competition_id
 * @property string $game_time
 * @property string $time_inserted
 * @property string $time_updated
 * @property integer $deleted
 */
class Fixtures extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return '{{fixtures}}';
	}
	
	 protected function afterFind ()
    {
            // convert to display format

        $this->game_time = date ('m/d/Y H:i', strtotime($this->game_time));

        parent::afterFind ();
    }

    protected function beforeValidate ()
    {
      
        $this->game_time = date ('Y-m-d H:i:s',strtotime($this->game_time));

        return parent::beforeValidate ();
    }


	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('deleted', 'numerical', 'integerOnly'=>true),
			array('competition_id', 'length', 'max'=>20),
			array('game_time, time_inserted, time_updated', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('fixture_id, competition_id, game_time, time_inserted, time_updated, deleted', 'safe', 'on'=>'search'),
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
			'fixture_id' => 'Fixture',
			'competition_id' => 'Competition',
			'game_time' => 'Game Time',
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

		$criteria->compare('fixture_id',$this->fixture_id,true);
		$criteria->compare('competition_id',$this->competition_id,true);
		$criteria->compare('game_time',$this->game_time,true);
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
	 * @return Fixtures the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
