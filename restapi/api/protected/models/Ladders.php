<?php

/**
 * This is the model class for table "{{ladders}}".
 *
 * The followings are the available columns in table '{{ladders}}':
 * @property string $competition_id
 * @property string $team_id
 * @property integer $matches_played
 * @property integer $match_wins
 * @property integer $match_losses
 * @property integer $match_draws
 * @property integer $match_points_for
 * @property integer $match_points_against
 * @property integer $ladder_points
 * @property string $time_inserted
 * @property string $time_updated
 * @property integer $deleted
 */
class Ladders extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return '{{ladders}}';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('competition_id, team_id', 'required'),
			array('matches_played, match_wins, match_losses, match_draws, match_points_for, match_points_against, ladder_points, deleted', 'numerical', 'integerOnly'=>true),
			array('competition_id, team_id', 'length', 'max'=>20),
			array('time_inserted, time_updated', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('competition_id, team_id, matches_played, match_wins, match_losses, match_draws, match_points_for, match_points_against, ladder_points, time_inserted, time_updated, deleted', 'safe', 'on'=>'search'),
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
			'team_id' => 'Team',
			'matches_played' => 'Matches Played',
			'match_wins' => 'Match Wins',
			'match_losses' => 'Match Losses',
			'match_draws' => 'Match Draws',
			'match_points_for' => 'Match Points For',
			'match_points_against' => 'Match Points Against',
			'ladder_points' => 'Ladder Points',
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
		$criteria->compare('team_id',$this->team_id,true);
		$criteria->compare('matches_played',$this->matches_played);
		$criteria->compare('match_wins',$this->match_wins);
		$criteria->compare('match_losses',$this->match_losses);
		$criteria->compare('match_draws',$this->match_draws);
		$criteria->compare('match_points_for',$this->match_points_for);
		$criteria->compare('match_points_against',$this->match_points_against);
		$criteria->compare('ladder_points',$this->ladder_points);
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
	 * @return Ladders the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
