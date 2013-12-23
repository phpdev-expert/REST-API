<?php

/**
 * This is the model class for table "{{notes}}".
 *
 * The followings are the available columns in table '{{notes}}':
 * @property string $note_id
 * @property integer $note_type
 * @property string $note_ref
 * @property string $entered_time
 * @property string $user_id
 * @property string $note
 * @property string $time_inserted
 * @property string $time_updated
 * @property integer $deleted
 */
class Notes extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return '{{notes}}';
	}
 protected function afterFind ()
    {
            // convert to display format

        $this->entered_time = date ('d/m/Y', strtotime($this->entered_time));

        parent::afterFind ();
    }

    protected function beforeValidate ()
    {
      
        $this->entered_time = date ('Y-m-d H:i:s');

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
			array('note_type, deleted', 'numerical', 'integerOnly'=>true),
			array('note_ref, user_id', 'length', 'max'=>20),
			array('entered_time, note, time_inserted, time_updated', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('note_id, note_type, note_ref, entered_time, user_id, note, time_inserted, time_updated, deleted', 'safe', 'on'=>'search'),
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
			'note_id' => 'Note',
			'note_type' => 'Note Type',
			'note_ref' => 'Note Ref',
			'entered_time' => 'Entered Time',
			'user_id' => 'User',
			'note' => 'Note',
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

		$criteria->compare('note_id',$this->note_id,true);
		$criteria->compare('note_type',$this->note_type);
		$criteria->compare('note_ref',$this->note_ref,true);
		$criteria->compare('entered_time',$this->entered_time,true);
		$criteria->compare('user_id',$this->user_id,true);
		$criteria->compare('note',$this->note,true);
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
	 * @return Notes the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
