<?php

/**
 * This is the model class for table "{{matches}}".
 *
 * The followings are the available columns in table '{{matches}}':
 * @property string $match_id
 * @property string $competition_id
 * @property string $match_time
 * @property string $team1_id
 * @property string $team2_id
 * @property integer $winner
 * @property string $result_summary
 * @property string $result_detail
 * @property integer $team1_score
 * @property integer $team2_score
 * @property integer $team1_acceptance
 * @property integer $team2_acceptance
 * @property integer $match_completed
 * @property string $time_inserted
 * @property string $time_updated
 * @property integer $deleted
 */
class Matches extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return '{{matches}}';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('winner, team1_score, team2_score, team1_acceptance, team2_acceptance, match_completed, deleted', 'numerical', 'integerOnly'=>true),
			array('competition_id, team1_id, team2_id', 'length', 'max'=>20),
			array('result_summary', 'length', 'max'=>250),
			array('match_time, result_detail, time_inserted, time_updated', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('match_id, competition_id, match_time, team1_id, team2_id, winner, result_summary, result_detail, team1_score, team2_score, team1_acceptance, team2_acceptance, match_completed, time_inserted, time_updated, deleted', 'safe', 'on'=>'search'),
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
			'match_id' => 'Match',
			'competition_id' => 'Competition',
			'match_time' => 'Match Time',
			'team1_id' => 'Team1',
			'team2_id' => 'Team2',
			'winner' => 'Winner',
			'result_summary' => 'Result Summary',
			'result_detail' => 'Result Detail',
			'team1_score' => 'Team1 Score',
			'team2_score' => 'Team2 Score',
			'team1_acceptance' => 'Team1 Acceptance',
			'team2_acceptance' => 'Team2 Acceptance',
			'match_completed' => 'Match Completed',
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

		$criteria->compare('match_id',$this->match_id,true);
		$criteria->compare('competition_id',$this->competition_id,true);
		$criteria->compare('match_time',$this->match_time,true);
		$criteria->compare('team1_id',$this->team1_id,true);
		$criteria->compare('team2_id',$this->team2_id,true);
		$criteria->compare('winner',$this->winner);
		$criteria->compare('result_summary',$this->result_summary,true);
		$criteria->compare('result_detail',$this->result_detail,true);
		$criteria->compare('team1_score',$this->team1_score);
		$criteria->compare('team2_score',$this->team2_score);
		$criteria->compare('team1_acceptance',$this->team1_acceptance);
		$criteria->compare('team2_acceptance',$this->team2_acceptance);
		$criteria->compare('match_completed',$this->match_completed);
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
	 * @return Matches the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
