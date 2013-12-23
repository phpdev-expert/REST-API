-- phpMyAdmin SQL Dump
-- version 3.2.0.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 23, 2013 at 08:46 AM
-- Server version: 5.1.36
-- PHP Version: 5.3.0

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `resstapi`
--

-- --------------------------------------------------------

--
-- Table structure for table `wp_users`
--

CREATE TABLE IF NOT EXISTS `wp_users` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_login` varchar(60) NOT NULL DEFAULT '',
  `user_pass` varchar(64) NOT NULL DEFAULT '',
  `user_nicename` varchar(50) NOT NULL DEFAULT '',
  `user_email` varchar(100) NOT NULL DEFAULT '',
  `user_url` varchar(100) NOT NULL DEFAULT '',
  `user_registered` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_activation_key` varchar(60) NOT NULL DEFAULT '',
  `user_status` int(11) NOT NULL DEFAULT '0',
  `display_name` varchar(250) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`),
  KEY `user_login_key` (`user_login`),
  KEY `user_nicename` (`user_nicename`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `wp_users`
--

INSERT INTO `wp_users` (`ID`, `user_login`, `user_pass`, `user_nicename`, `user_email`, `user_url`, `user_registered`, `user_activation_key`, `user_status`, `display_name`) VALUES
(1, 'paul', 'password', 'Paul Filmer', 'paul@univex.com', '', '0000-00-00 00:00:00', '', 0, ''),
(2, 'dhirendrazxzxZxZxZxZxZZx', 'password', 'Dhirendra Bisht', 'dhirendra@gmail.com', '', '0000-00-00 00:00:00', '', 0, ''),
(3, 'java', 'Team Name', 'java', 'java@java.com', '', '0000-00-00 00:00:00', '', 0, ''),
(4, 'php', 'Team Name', 'java', 'java@java.com', '', '0000-00-00 00:00:00', '', 0, ''),
(5, 'roy', 'Team Name', 'java', 'java@java.com', '', '0000-00-00 00:00:00', '', 0, ''),
(6, 'jack', 'Team Name', 'java', 'java@java.com', '', '0000-00-00 00:00:00', '', 0, ''),
(7, 'martin', 'Team Name', 'java', 'java@java.com', '', '0000-00-00 00:00:00', '', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `xx_competitions`
--

CREATE TABLE IF NOT EXISTS `xx_competitions` (
  `competition_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `competition_name` varchar(255) NOT NULL,
  `tier_id` bigint(20) DEFAULT NULL,
  `players_per_team` int(11) DEFAULT NULL,
  `points_detail` mediumtext,
  `rules_detail` mediumtext,
  `prizes_detail` mediumtext,
  `other_detail` mediumtext,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `time_inserted` datetime DEFAULT NULL,
  `time_updated` datetime DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `can_join` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`competition_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Triggers `xx_competitions`
--
DROP TRIGGER IF EXISTS `resstapi`.`xx_competitions_timestamp_bi_fer`;
DELIMITER //
CREATE TRIGGER `resstapi`.`xx_competitions_timestamp_bi_fer` BEFORE INSERT ON `resstapi`.`xx_competitions`
 FOR EACH ROW SET NEW.time_inserted = NOW()
//
DELIMITER ;

--
-- Dumping data for table `xx_competitions`
--

INSERT INTO `xx_competitions` (`competition_id`, `competition_name`, `tier_id`, `players_per_team`, `points_detail`, `rules_detail`, `prizes_detail`, `other_detail`, `active`, `time_inserted`, `time_updated`, `deleted`, `can_join`) VALUES
(1, 'gggggg', 1, 11, '<p><strong>sasdasd</strong></p>', '<p><em>sdasdsads</em></p>\n<p>&nbsp;</p>\n<p><em>rules</em></p>', '<ul>\n<li>\n<blockquote>ssssssssssssssssss</blockquote>\n</li>\n<li>\n<blockquote>sdas</blockquote>\n</li>\n<li>\n<blockquote>ssad</blockquote>\n</li>\n<li>\n<blockquote>ytyt</blockquote>\n</li>\n<li>\n<blockquote>utyuu</blockquote>\n</li>\n<li>\n<blockquote>tutyu</blockquote>\n</li>\n<li>\n<blockquote>utyu</blockquote>\n</li>\n<li>\n<blockquote>tyutyu</blockquote>\n</li>\n<li>\n<blockquote>tyuty</blockquote>\n</li>\n<li>\n<blockquote>utyu</blockquote>\n</li>\n<li>\n<blockquote>tuty</blockquote>\n</li>\n<li>\n<blockquote>uty</blockquote>\n</li>\n<li>\n<blockquote>uty</blockquote>\n</li>\n<li>\n<blockquote>uty</blockquote>\n</li>\n<li>\n<blockquote>utu</blockquote>\n</li>\n<li>\n<blockquote>ty</blockquote>\n</li>\n<li>\n<blockquote>uty2y6976 6y96 6y 9825y66 66 2y6iuiot</blockquote>\n</li>\n<li>\n<blockquote>uty</blockquote>\n</li>\n<li>\n<blockquote>u</blockquote>\n</li>\n<li>\n<blockquote>tyu</blockquote>\n</li>\n<li>\n<blockquote>ty</blockquote>\n</li>\n<li>\n<blockquote>uty</blockquote>\n</li>\n<li>\n<blockquote>u&nbsp; 56hk45h64i6 6ou4o56 4o4o64 5ou6o456uo67y 89</blockquote>\n</li>\n</ul>', '<p>sadasd<br />sds</p>\n<p>adasd</p>\n<p>sd</p>\n<p>sds</p>\n<p>das</p>\n<p>dsa</p>\n<p>ds</p>\n<p>ds</p>\n<p>dsad</p>\n<p>&nbsp;</p>', 1, '2013-10-19 09:24:18', NULL, 1, 1),
(3, 'cdd', 5, 3, '<p>zxZ</p>', '<p>ZxZxZ</p>', '<p>ZXZxZx</p>', '<p>zxZxZXZxZx</p>', 0, '2013-10-25 09:49:22', NULL, 0, 1),
(4, 'testcomp', 1, 12, '<p>ssada</p>', '<p>sadsds</p>', '', '', 0, '2013-11-17 07:33:33', NULL, 1, 0),
(5, 'sdd', 1, 1, '', '', '', '', 0, '2013-11-19 07:29:10', NULL, 1, 0),
(6, 'asdasd', 1, 1, '', '', '', '', 0, '2013-11-19 07:30:56', NULL, 1, 0),
(7, 'htygy', 1, 23, '', '', '', '', 0, '2013-11-19 08:06:00', NULL, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `xx_consoles`
--

CREATE TABLE IF NOT EXISTS `xx_consoles` (
  `console_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `console_name` varchar(100) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `time_inserted` datetime DEFAULT NULL,
  `time_updated` datetime DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`console_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- Triggers `xx_consoles`
--
DROP TRIGGER IF EXISTS `resstapi`.`xx_consoles_timestamp_bi_fer`;
DELIMITER //
CREATE TRIGGER `resstapi`.`xx_consoles_timestamp_bi_fer` BEFORE INSERT ON `resstapi`.`xx_consoles`
 FOR EACH ROW SET NEW.time_inserted = NOW()
//
DELIMITER ;

--
-- Dumping data for table `xx_consoles`
--

INSERT INTO `xx_consoles` (`console_id`, `console_name`, `active`, `time_inserted`, `time_updated`, `deleted`) VALUES
(1, 'console 1', 1, '2013-09-17 20:42:11', '2013-09-17 20:42:11', 1),
(2, 'testcosole', 1, '2013-09-17 20:42:24', '2013-09-17 20:42:24', 1),
(3, 'console-x', 1, '2013-09-17 20:45:14', '2013-09-18 10:34:56', 0),
(4, 'testcosolenew', 1, '2013-09-17 20:45:35', '2013-09-18 08:51:22', 1),
(5, 'myconsole', 1, '2013-09-17 20:47:11', '2013-09-17 20:47:11', 1),
(6, 'myconsole1', 1, '2013-09-17 20:48:32', '2013-09-18 11:01:02', 0),
(7, 'new console', 1, '2013-09-17 20:50:10', '2013-09-17 20:50:10', 1),
(8, 'console-x', 0, '2013-09-17 20:52:29', '2013-09-18 11:01:07', 1),
(9, 'console-xox', 1, '2013-09-17 20:53:20', '2013-09-17 20:53:20', 0),
(10, 'console-xbox', 1, '2013-09-17 20:54:27', '2013-09-17 20:54:27', 1),
(11, 'xbox-2', 1, '2013-09-17 20:57:34', '2013-09-17 20:57:34', 1),
(12, 'IGI', 0, '2013-09-18 10:03:47', '2013-09-18 10:03:47', 1),
(13, 'IGI', 0, '2013-09-18 10:05:56', '2013-09-18 10:05:56', 1),
(14, 'igi', 0, '2013-09-18 10:06:19', '2013-09-18 10:06:19', 1),
(15, 'myosolelog', 0, '2013-09-19 09:53:35', '2013-09-19 09:53:35', 0),
(16, 'new', 0, '2013-10-08 09:09:00', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `xx_fixtures`
--

CREATE TABLE IF NOT EXISTS `xx_fixtures` (
  `fixture_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `competition_id` bigint(20) DEFAULT NULL,
  `game_time` datetime DEFAULT NULL,
  `time_inserted` datetime DEFAULT NULL,
  `time_updated` datetime DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`fixture_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=70 ;

--
-- Triggers `xx_fixtures`
--
DROP TRIGGER IF EXISTS `resstapi`.`xx_fixtures_timestamp_bi_fer`;
DELIMITER //
CREATE TRIGGER `resstapi`.`xx_fixtures_timestamp_bi_fer` BEFORE INSERT ON `resstapi`.`xx_fixtures`
 FOR EACH ROW SET NEW.time_inserted = NOW()
//
DELIMITER ;

--
-- Dumping data for table `xx_fixtures`
--

INSERT INTO `xx_fixtures` (`fixture_id`, `competition_id`, `game_time`, `time_inserted`, `time_updated`, `deleted`) VALUES
(59, 4, '2013-10-18 14:00:00', '2013-11-17 07:33:57', NULL, 0),
(60, 5, '1970-01-01 00:00:00', '2013-11-19 07:29:30', NULL, 0),
(62, 6, '2013-11-19 04:23:00', '2013-11-19 07:31:32', NULL, 0),
(63, 1, '1970-01-01 00:00:00', '2013-11-19 07:37:03', NULL, 0),
(64, 1, '1970-01-01 00:00:00', '2013-11-19 07:37:03', NULL, 0),
(65, 1, '1970-01-01 00:00:00', '2013-11-19 07:37:03', NULL, 0),
(66, 1, '2013-11-21 08:00:00', '2013-11-19 07:37:03', NULL, 0),
(68, 3, '2013-10-02 00:00:00', '2013-11-19 08:06:33', NULL, 0),
(69, 3, '2013-11-20 08:00:00', '2013-11-19 08:06:33', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `xx_games`
--

CREATE TABLE IF NOT EXISTS `xx_games` (
  `game_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `game_name` varchar(100) DEFAULT NULL,
  `console_id` bigint(20) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `time_inserted` datetime DEFAULT NULL,
  `time_updated` datetime DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`game_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

--
-- Triggers `xx_games`
--
DROP TRIGGER IF EXISTS `resstapi`.`xx_games_timestamp_bi_fer`;
DELIMITER //
CREATE TRIGGER `resstapi`.`xx_games_timestamp_bi_fer` BEFORE INSERT ON `resstapi`.`xx_games`
 FOR EACH ROW SET NEW.time_inserted = NOW()
//
DELIMITER ;

--
-- Dumping data for table `xx_games`
--

INSERT INTO `xx_games` (`game_id`, `game_name`, `console_id`, `active`, `time_inserted`, `time_updated`, `deleted`) VALUES
(1, 'nfs mw', 6, 1, '2013-09-18 08:02:53', '2013-09-18 10:03:06', 1),
(2, 'snakes-n', 16, 0, '2013-09-18 09:30:52', '2013-09-18 10:02:31', 0),
(3, 'igi', 16, 0, '2013-09-18 10:07:07', '2013-09-18 10:07:00', 0),
(10, 'activx', 6, 1, '2013-10-07 09:57:19', NULL, 0),
(11, 'newe', 1, 0, '2013-10-07 10:14:59', NULL, 0),
(12, 'newezasas', 1, 0, '2013-10-07 10:16:52', NULL, 0),
(13, 'newezasas', 1, 0, '2013-10-07 10:18:24', NULL, 0),
(14, 'test', 11, 0, '2013-10-07 10:20:15', NULL, 1),
(15, 'xxx', 15, 0, '2013-10-08 08:36:38', NULL, 0),
(16, 'xxxxxx', 6, 0, '2013-10-08 08:37:51', NULL, 0),
(18, 'sssxxx', 3, 0, '2013-10-08 08:39:53', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `xx_ladders`
--

CREATE TABLE IF NOT EXISTS `xx_ladders` (
  `ladders_id` int(11) NOT NULL AUTO_INCREMENT,
  `competition_id` bigint(20) NOT NULL,
  `team_id` bigint(20) NOT NULL,
  `matches_played` int(11) DEFAULT NULL,
  `match_wins` int(11) DEFAULT NULL,
  `match_losses` int(11) DEFAULT NULL,
  `match_draws` int(11) DEFAULT NULL,
  `match_points_for` int(11) DEFAULT NULL,
  `match_points_against` int(11) DEFAULT NULL,
  `ladder_points` int(11) DEFAULT NULL,
  `time_inserted` datetime DEFAULT NULL,
  `time_updated` datetime DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ladders_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `xx_ladders`
--

INSERT INTO `xx_ladders` (`ladders_id`, `competition_id`, `team_id`, `matches_played`, `match_wins`, `match_losses`, `match_draws`, `match_points_for`, `match_points_against`, `ladder_points`, `time_inserted`, `time_updated`, `deleted`) VALUES
(1, 1, 1, 1, 1, 1, 8, 12, 11, 23, '2013-10-10 22:14:14', '2013-10-31 22:14:18', 0),
(2, 1, 2, 3, 2, 1, 0, 12, 15, 27, '2013-10-10 22:14:14', '2013-10-31 22:14:18', 1),
(3, 2, 2, 3, 1, 1, 1, 100, 200, 300, NULL, NULL, 1),
(4, 1, 1, 7, 23, NULL, NULL, 1, 2333, 22, NULL, NULL, 0),
(5, 1, 1, 34, 5, NULL, NULL, 555, 55, 555, NULL, NULL, 0),
(6, 1, 1, 34, 2, 23, 2, 222, 222, 22, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `xx_matches`
--

CREATE TABLE IF NOT EXISTS `xx_matches` (
  `match_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `competition_id` bigint(20) DEFAULT NULL,
  `match_time` datetime DEFAULT NULL,
  `team1_id` bigint(20) DEFAULT NULL,
  `team2_id` bigint(20) DEFAULT NULL,
  `winner` int(11) DEFAULT NULL,
  `result_summary` varchar(250) DEFAULT NULL,
  `result_detail` mediumtext,
  `team1_score` int(11) DEFAULT NULL,
  `team2_score` int(11) DEFAULT NULL,
  `team1_acceptance` int(11) DEFAULT NULL,
  `team2_acceptance` int(11) DEFAULT NULL,
  `match_completed` tinyint(1) NOT NULL DEFAULT '0',
  `time_inserted` datetime DEFAULT NULL,
  `time_updated` datetime DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`match_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Triggers `xx_matches`
--
DROP TRIGGER IF EXISTS `resstapi`.`xx_matches_timestamp_bi_fer`;
DELIMITER //
CREATE TRIGGER `resstapi`.`xx_matches_timestamp_bi_fer` BEFORE INSERT ON `resstapi`.`xx_matches`
 FOR EACH ROW SET NEW.time_inserted = NOW()
//
DELIMITER ;

--
-- Dumping data for table `xx_matches`
--

INSERT INTO `xx_matches` (`match_id`, `competition_id`, `match_time`, `team1_id`, `team2_id`, `winner`, `result_summary`, `result_detail`, `team1_score`, `team2_score`, `team1_acceptance`, `team2_acceptance`, `match_completed`, `time_inserted`, `time_updated`, `deleted`) VALUES
(2, 1, '2013-10-24 00:00:00', 1, 2, 0, 'dd', '<p><strong>xcxxx</strong></p>\n<p>&nbsp;</p>\n<p><strong>ccdsdfdfsd</strong></p>\n<p><strong>sdfsd</strong></p>\n<p><strong>fsdf</strong></p>\n<p><strong>sdf</strong></p>\n<p><strong>sd</strong></p>', NULL, NULL, NULL, NULL, 0, '2013-10-24 09:00:11', NULL, 1),
(3, 1, '2013-10-16 00:00:00', 1, 2, 0, '', '', NULL, NULL, NULL, NULL, 0, '2013-10-25 09:28:38', NULL, 1),
(4, 3, '2013-10-26 06:00:00', 2, 1, 1, '', '', NULL, NULL, NULL, NULL, 0, '2013-10-25 09:29:45', NULL, 0),
(5, 3, '2013-10-17 00:00:00', 1, 2, 3, 'zxzx ZxZ', '<p>ZxZxZxZXZX</p>\n<p>xZx</p>\n<p>Zx</p>\n<p>Zx</p>\n<p>Z<br />xZ<br />xZ<br />xZxZx</p>', NULL, NULL, NULL, NULL, 0, '2013-10-25 09:50:01', NULL, 0),
(6, 1, '2013-11-17 07:17:00', 1, 2, 0, '', '', NULL, NULL, NULL, NULL, 0, '2013-10-26 21:29:39', NULL, 0),
(7, 1, '2013-10-30 00:00:00', 1, 2, 0, 'ss', '<p>ssssssssss</p>\n<p>sss</p>', 22, 21, 1, 1, 1, '2013-10-26 21:32:16', NULL, 1),
(8, 1, '2013-10-24 00:00:00', 2, 1, 0, 'yu', '', 0, 88, 1, 1, 1, '2013-10-29 10:33:15', NULL, 1),
(9, 1, '1970-01-01 00:00:00', 1, 2, 3, '', '', NULL, NULL, 0, 0, 1, '2013-10-29 10:38:36', NULL, 1),
(10, 1, '1970-01-01 00:00:00', 1, 2, 0, '', '', NULL, NULL, 0, 0, 1, '2013-11-19 07:33:30', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `xx_notes`
--

CREATE TABLE IF NOT EXISTS `xx_notes` (
  `note_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `note_type` int(11) DEFAULT NULL,
  `note_ref` bigint(20) DEFAULT NULL,
  `entered_time` datetime DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `note` mediumtext,
  `time_inserted` datetime DEFAULT NULL,
  `time_updated` datetime DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`note_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- Triggers `xx_notes`
--
DROP TRIGGER IF EXISTS `resstapi`.`xx_notes_timestamp_bi_fer`;
DELIMITER //
CREATE TRIGGER `resstapi`.`xx_notes_timestamp_bi_fer` BEFORE INSERT ON `resstapi`.`xx_notes`
 FOR EACH ROW SET NEW.time_inserted = NOW()
//
DELIMITER ;

--
-- Dumping data for table `xx_notes`
--

INSERT INTO `xx_notes` (`note_id`, `note_type`, `note_ref`, `entered_time`, `user_id`, `note`, `time_inserted`, `time_updated`, `deleted`) VALUES
(1, 2, 2, NULL, NULL, '', '2013-11-13 07:28:26', NULL, 0),
(2, 2, 2, NULL, NULL, '<p>zxzxx</p>\n<p>zxZxz</p>\n<p>ZxZx</p>', '2013-11-13 07:30:01', NULL, 0),
(3, 2, 4, '2013-11-13 16:04:23', NULL, '<p>sdsadsd</p>\n<p>sdasdasd</p>\n<p>asdasdas</p>\n<p>d</p>', '2013-11-13 07:33:11', NULL, 1),
(4, 2, 4, '2013-11-13 16:04:26', NULL, '<p>xzxsd</p>\n<p>dasdas</p>\n<p>dsd</p>\n<p>asd</p>', '2013-11-13 07:41:48', NULL, 1),
(5, 2, 4, NULL, NULL, '<p><strong>fffffffffffffffffffffffffffffffffffffff</strong></p>', '2013-11-13 07:52:14', NULL, 1),
(6, 2, 4, '2013-11-13 16:25:39', NULL, '<p><strong>khkhhkhkh</strong></p>', '2013-11-13 08:02:38', NULL, 0),
(7, 2, 4, '2013-11-13 16:25:26', NULL, '<p>ghfghfghfh</p>', '2013-11-13 08:25:26', NULL, 0),
(8, 2, 4, '2013-11-13 16:25:46', NULL, '<p><strong>khkhhkhkh kk</strong></p>', '2013-11-13 08:25:46', NULL, 0),
(9, 1, 4, '2013-11-13 16:43:27', NULL, '<p>hregrttrteteter</p>', '2013-11-13 08:43:27', NULL, 0),
(10, 2, 4, '2013-11-16 03:13:57', 1, '<p>dfdfdf</p>', '2013-11-15 19:13:57', NULL, 0),
(11, 2, 5, '2013-11-17 15:52:22', 1, '<p>tese nuyu</p>', '2013-11-17 07:51:42', NULL, 1),
(12, 2, 5, '2013-11-17 15:52:11', 1, '<p>tese nuyu</p>', '2013-11-17 07:51:44', NULL, 1),
(13, 2, 5, '2013-11-17 15:52:16', 1, '', '2013-11-17 07:51:46', NULL, 1),
(14, 2, 5, '2013-11-17 15:52:19', 1, '<p>gghfgfhf&nbsp;&nbsp;&nbsp;&nbsp; gfggfg&nbsp;</p>', '2013-11-17 07:52:01', NULL, 1),
(15, 2, 5, '2013-11-17 15:57:12', 1, '<p style="text-align: justify;"><strong>Hi Dhirendra</strong><br /><span style="text-decoration: underline;">apart from the notes fix you did today,</span></p>\n<ol>\n<li>I have just a few simple things to do:</li>\n<li>Add this field to competition:</li>\n<li>True if this competition is available</li>\n</ol>\n<p><br /><em>If you are interested why we need it:</em></p>', '2013-11-17 07:53:45', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `xx_teammembers`
--

CREATE TABLE IF NOT EXISTS `xx_teammembers` (
  `team_member_id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `joined_time` datetime DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `time_inserted` datetime DEFAULT NULL,
  `time_updated` datetime DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`team_member_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Triggers `xx_teammembers`
--
DROP TRIGGER IF EXISTS `resstapi`.`xx_teammembers_timestamp_bi_fer`;
DELIMITER //
CREATE TRIGGER `resstapi`.`xx_teammembers_timestamp_bi_fer` BEFORE INSERT ON `resstapi`.`xx_teammembers`
 FOR EACH ROW SET NEW.time_inserted = NOW()
//
DELIMITER ;

--
-- Dumping data for table `xx_teammembers`
--

INSERT INTO `xx_teammembers` (`team_member_id`, `team_id`, `user_id`, `joined_time`, `active`, `time_inserted`, `time_updated`, `deleted`) VALUES
(1, 1, 2, '2013-10-24 00:00:00', 0, '2013-10-24 07:44:07', NULL, 0),
(2, 2, 2, '2013-10-24 00:00:00', 0, '2013-10-24 08:00:25', NULL, 0),
(3, 2, 3, '2013-10-24 00:00:00', 0, '2013-10-24 08:00:25', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `xx_teams`
--

CREATE TABLE IF NOT EXISTS `xx_teams` (
  `team_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `team_name` varchar(100) DEFAULT NULL,
  `game_id` bigint(20) DEFAULT NULL,
  `captain_user_id` bigint(20) DEFAULT NULL,
  `time_inserted` datetime DEFAULT NULL,
  `time_updated` datetime DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`team_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Triggers `xx_teams`
--
DROP TRIGGER IF EXISTS `resstapi`.`xx_teams_timestamp_bi_fer`;
DELIMITER //
CREATE TRIGGER `resstapi`.`xx_teams_timestamp_bi_fer` BEFORE INSERT ON `resstapi`.`xx_teams`
 FOR EACH ROW SET NEW.time_inserted = NOW()
//
DELIMITER ;

--
-- Dumping data for table `xx_teams`
--

INSERT INTO `xx_teams` (`team_id`, `team_name`, `game_id`, `captain_user_id`, `time_inserted`, `time_updated`, `deleted`) VALUES
(1, 'xx', 2, 2, '2013-10-24 07:44:05', NULL, 0),
(2, 'xx-23', 2, NULL, '2013-10-24 08:00:25', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `xx_teamtiers`
--

CREATE TABLE IF NOT EXISTS `xx_teamtiers` (
  `team_id` bigint(20) NOT NULL,
  `tier_id` bigint(20) NOT NULL,
  `time_inserted` datetime DEFAULT NULL,
  `time_updated` datetime DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`team_id`,`tier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `xx_teamtiers`
--

INSERT INTO `xx_teamtiers` (`team_id`, `tier_id`, `time_inserted`, `time_updated`, `deleted`) VALUES
(1, 1, NULL, NULL, 0),
(2, 1, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `xx_tiers`
--

CREATE TABLE IF NOT EXISTS `xx_tiers` (
  `tier_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `game_id` bigint(20) DEFAULT NULL,
  `tier_name` varchar(100) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `time_inserted` datetime DEFAULT NULL,
  `time_updated` datetime DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`tier_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Triggers `xx_tiers`
--
DROP TRIGGER IF EXISTS `resstapi`.`xx_tiers_timestamp_bi_fer`;
DELIMITER //
CREATE TRIGGER `resstapi`.`xx_tiers_timestamp_bi_fer` BEFORE INSERT ON `resstapi`.`xx_tiers`
 FOR EACH ROW SET NEW.time_inserted = NOW()
//
DELIMITER ;

--
-- Dumping data for table `xx_tiers`
--

INSERT INTO `xx_tiers` (`tier_id`, `game_id`, `tier_name`, `sort_order`, `active`, `time_inserted`, `time_updated`, `deleted`) VALUES
(1, 2, 'easy', 2, 1, '2013-10-10 11:03:17', NULL, 0),
(2, 1, 'xyzs', 11, 1, '2013-10-11 08:31:43', NULL, 0),
(3, 1, 'aaa', 2, 0, '2013-10-11 08:33:37', NULL, 0),
(4, 3, 'sss', 3, 0, '2013-10-14 08:50:14', NULL, 1),
(5, 3, 'ssss1', 1, 0, '2013-10-14 08:50:58', NULL, 0),
(6, 2, 'cc', 2, 0, '2013-10-21 10:00:32', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `xx_userbans`
--

CREATE TABLE IF NOT EXISTS `xx_userbans` (
  `ban_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `ban_all` tinyint(1) NOT NULL DEFAULT '0',
  `ban_console` bigint(20) DEFAULT NULL,
  `ban_game` bigint(20) DEFAULT NULL,
  `ban_start` datetime DEFAULT NULL,
  `ban_end` datetime DEFAULT NULL,
  `ban_reason` varchar(250) DEFAULT NULL,
  `banned_by` bigint(20) DEFAULT NULL,
  `time_inserted` datetime DEFAULT NULL,
  `time_updated` datetime DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ban_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- Triggers `xx_userbans`
--
DROP TRIGGER IF EXISTS `resstapi`.`xx_userbans_timestamp_bi_fer`;
DELIMITER //
CREATE TRIGGER `resstapi`.`xx_userbans_timestamp_bi_fer` BEFORE INSERT ON `resstapi`.`xx_userbans`
 FOR EACH ROW SET NEW.time_inserted = NOW()
//
DELIMITER ;

--
-- Dumping data for table `xx_userbans`
--

INSERT INTO `xx_userbans` (`ban_id`, `user_id`, `ban_all`, `ban_console`, `ban_game`, `ban_start`, `ban_end`, `ban_reason`, `banned_by`, `time_inserted`, `time_updated`, `deleted`) VALUES
(4, 1, 0, 3, 0, '2013-10-09 00:00:00', '2013-10-23 00:00:00', 's--upadte-1', 1, '2013-10-12 23:19:55', NULL, 0),
(5, 1, 1, 0, 0, '2013-10-23 00:00:00', '2013-10-31 00:00:00', 'dd', 1, '2013-10-13 01:09:33', NULL, 0),
(7, 2, 0, 0, 2, '2013-10-08 00:00:00', '2013-10-20 00:00:00', 'z', 1, '2013-10-13 08:19:14', NULL, 0),
(8, 2, 1, 0, 0, '2013-10-13 00:00:00', '2013-10-20 00:00:00', 'x', 1, '2013-10-13 08:20:25', NULL, 0),
(9, 2, 1, 0, 0, '2013-10-13 00:00:00', '2013-10-20 00:00:00', 'x', 1, '2013-10-13 08:23:41', NULL, 0),
(12, 1, 1, 0, 0, '2013-10-13 00:00:00', '2013-10-13 00:00:00', 's', 1, '2013-10-13 09:08:26', NULL, 0),
(13, 1, 1, 0, 0, '2013-10-13 00:00:00', '2013-10-13 00:00:00', 's', 1, '2013-10-13 09:09:03', NULL, 0),
(14, 2, 1, 0, 0, '2013-10-13 00:00:00', '2013-10-20 00:00:00', 'ss', 1, '2013-10-13 09:14:07', NULL, 1),
(15, 1, 1, 0, 0, '2013-09-10 00:00:00', '0000-00-00 00:00:00', 'me', 1, '2013-10-23 07:37:29', NULL, 0);
