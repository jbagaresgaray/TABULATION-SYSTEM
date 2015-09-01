-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 01, 2015 at 03:19 AM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `tabulation`
--

DROP SCHEMA IF EXISTS `tabulation`;
CREATE SCHEMA `tabulation`;
USE `tabulation`;

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE IF NOT EXISTS `activities` (
  `actid` int(11) NOT NULL,
  `actname` varchar(45) NOT NULL,
  `actstartdate` varchar(15) NOT NULL,
  `actenddate` varchar(15) NOT NULL,
  `userid` int(10) unsigned NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`actid`, `actname`, `actstartdate`, `actenddate`, `userid`) VALUES
(82, 'PALAKASAN 2015', '08/15/2015', '02-02-2015', 1),
(105, 'PALAKASAN 2020', '08/12/2015', '08/08/2015', 1),
(106, 'PALAKASAN 2030', '08/15/2030', '08/25/2030', 1);

-- --------------------------------------------------------

--
-- Table structure for table `contestants`
--

CREATE TABLE IF NOT EXISTS `contestants` (
  `contestantid` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL DEFAULT '',
  `eventid` int(10) unsigned NOT NULL DEFAULT '0',
  `departmentid` int(10) unsigned NOT NULL DEFAULT '0',
  `gender` varchar(10) NOT NULL DEFAULT ''
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contestants`
--

INSERT INTO `contestants` (`contestantid`, `name`, `eventid`, `departmentid`, `gender`) VALUES
(2, 'kissai rance', 18, 1, 'Female'),
(17, 'marvee abas', 18, 7, 'Female'),
(43, 'Jocelyn Dumapias', 18, 8, 'Female'),
(44, 'May Suyman', 18, 9, 'Female'),
(45, 'Team-dhan', 19, 1, 'Male'),
(47, 'Team-Brian', 19, 7, 'Male'),
(48, 'Team-Altonie', 18, 8, 'Male'),
(49, 'Team Darren', 19, 9, 'Male');

-- --------------------------------------------------------

--
-- Table structure for table `criteria`
--

CREATE TABLE IF NOT EXISTS `criteria` (
  `criteriaid` int(10) unsigned NOT NULL,
  `criterianame` varchar(50) NOT NULL DEFAULT '',
  `percentage` double NOT NULL DEFAULT '0',
  `eventid` int(10) unsigned NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `criteria`
--

INSERT INTO `criteria` (`criteriaid`, `criterianame`, `percentage`, `eventid`) VALUES
(1, 'beauty', 20, 18),
(5, 'stage presence', 20, 18),
(8, 'charm', 40, 18),
(9, 'uniform', 90, 19),
(10, 'hotness', 10, 19),
(15, 'Q and A', 20, 18);

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE IF NOT EXISTS `departments` (
  `departmentid` int(10) unsigned NOT NULL,
  `departmentname` varchar(100) NOT NULL DEFAULT '',
  `departmentdesc` varchar(100) NOT NULL DEFAULT ''
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`departmentid`, `departmentname`, `departmentdesc`) VALUES
(1, 'Department 1', 'Department 1 description ...'),
(7, 'Department 2', 'Department of Information Technology'),
(8, 'Department 3', '...'),
(9, 'Department 4', '4444');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE IF NOT EXISTS `events` (
  `eventid` int(10) unsigned NOT NULL,
  `eventname` varchar(45) NOT NULL DEFAULT '',
  `eventdescription` varchar(100) NOT NULL DEFAULT '',
  `eventdate` varchar(45) NOT NULL DEFAULT '',
  `actid` int(10) unsigned NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`eventid`, `eventname`, `eventdescription`, `eventdate`, `actid`) VALUES
(18, 'Miss Palakasan 2015', 'xxxxxxxxxx', '01-02-2015', 82),
(19, 'Basketball 2015', 'xxxxxxxxxx', '01-02-2015', 82),
(20, 'Volleyball 2015', 'xxxxxxxxxx', '01-02-2015', 82),
(21, 'Badminton 2015', 'xxxxxxxxxx', '01-02-2015', 82),
(22, 'Cheerleeding 2015', 'xxxxxxxxxx', '01-02-2015', 82);

-- --------------------------------------------------------

--
-- Table structure for table `judges`
--

CREATE TABLE IF NOT EXISTS `judges` (
  `judgeid` int(10) unsigned NOT NULL,
  `judgefullname` varchar(45) NOT NULL DEFAULT '',
  `judgeuname` varchar(45) NOT NULL DEFAULT '',
  `judgepword` varchar(45) NOT NULL DEFAULT '',
  `eventid` int(10) unsigned NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `judges`
--

INSERT INTO `judges` (`judgeid`, `judgefullname`, `judgeuname`, `judgepword`, `eventid`) VALUES
(3, 'grace tagailo', 'grace', 'grace', 18),
(4, 'glenda tagailo', 'glenda', 'glenda', 18),
(5, 'marjorie tagailo', 'marj', 'marj', 18),
(6, 'mona tagailo', 'mona', 'mona', 18),
(7, 'michelle tagailo', 'mich', 'mihc', 18),
(8, 'Andy', 'andy.bellesco', '927', 18);

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE IF NOT EXISTS `scores` (
  `scoreid` int(10) unsigned NOT NULL,
  `eventid` int(10) unsigned NOT NULL DEFAULT '0',
  `judgeid` int(10) unsigned NOT NULL DEFAULT '0',
  `criteriaid` int(10) unsigned NOT NULL DEFAULT '0',
  `score` double NOT NULL DEFAULT '0',
  `contestantid` int(10) unsigned NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`scoreid`, `eventid`, `judgeid`, `criteriaid`, `score`, `contestantid`) VALUES
(46, 18, 3, 1, 18, 2),
(47, 18, 3, 5, 19, 2),
(48, 18, 3, 8, 39, 2),
(49, 18, 3, 15, 19, 2),
(50, 18, 3, 15, 15, 17),
(51, 18, 3, 8, 35, 17),
(52, 18, 3, 5, 17, 17),
(54, 18, 3, 15, 20, 43),
(55, 18, 3, 8, 40, 43),
(56, 18, 3, 5, 20, 43),
(57, 18, 3, 1, 20, 43),
(58, 18, 3, 15, 20, 44),
(59, 18, 3, 8, 37, 44),
(60, 18, 3, 5, 16, 44),
(61, 18, 3, 1, 17, 44),
(62, 19, 3, 9, 90, 45),
(63, 19, 3, 10, 10, 45),
(64, 19, 3, 10, 8, 47),
(65, 19, 3, 9, 87, 47),
(66, 19, 3, 10, 8, 48),
(67, 19, 3, 9, 89, 48),
(68, 19, 3, 10, 9, 49),
(69, 19, 3, 9, 89, 49),
(70, 18, 3, 1, 19, 17);

-- --------------------------------------------------------

--
-- Table structure for table `useraccounts`
--

CREATE TABLE IF NOT EXISTS `useraccounts` (
  `accid` int(10) unsigned NOT NULL,
  `acctype` varchar(15) NOT NULL DEFAULT '',
  `userid` int(10) unsigned NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `useraccounts`
--

INSERT INTO `useraccounts` (`accid`, `acctype`, `userid`) VALUES
(1, 'admin', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `userid` int(10) unsigned NOT NULL,
  `userfirstname` varchar(45) NOT NULL DEFAULT '',
  `usermiddlename` varchar(45) NOT NULL DEFAULT '',
  `userlastname` varchar(45) NOT NULL DEFAULT '',
  `username` varchar(45) NOT NULL DEFAULT '',
  `password` varchar(45) NOT NULL DEFAULT ''
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `userfirstname`, `usermiddlename`, `userlastname`, `username`, `password`) VALUES
(1, 'dhan', 'vincent', 'blue', 'dhan', '1234');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`actid`), ADD KEY `FK_activities_1` (`userid`);

--
-- Indexes for table `contestants`
--
ALTER TABLE `contestants`
  ADD PRIMARY KEY (`contestantid`), ADD KEY `FK_contestants_1` (`eventid`), ADD KEY `FK_contestants_2` (`departmentid`);

--
-- Indexes for table `criteria`
--
ALTER TABLE `criteria`
  ADD PRIMARY KEY (`criteriaid`), ADD KEY `FK_criteria_1` (`eventid`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`departmentid`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`eventid`);

--
-- Indexes for table `judges`
--
ALTER TABLE `judges`
  ADD PRIMARY KEY (`judgeid`), ADD KEY `FK_judges_1` (`eventid`);

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`scoreid`), ADD KEY `FK_scores_1` (`eventid`), ADD KEY `FK_scores_2` (`judgeid`), ADD KEY `FK_scores_3` (`criteriaid`), ADD KEY `FK_scores_4` (`contestantid`);

--
-- Indexes for table `useraccounts`
--
ALTER TABLE `useraccounts`
  ADD PRIMARY KEY (`accid`), ADD KEY `FK_useraccounts_1` (`userid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `actid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=107;
--
-- AUTO_INCREMENT for table `contestants`
--
ALTER TABLE `contestants`
  MODIFY `contestantid` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=53;
--
-- AUTO_INCREMENT for table `criteria`
--
ALTER TABLE `criteria`
  MODIFY `criteriaid` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `departmentid` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `eventid` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `judges`
--
ALTER TABLE `judges`
  MODIFY `judgeid` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `scoreid` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=81;
--
-- AUTO_INCREMENT for table `useraccounts`
--
ALTER TABLE `useraccounts`
  MODIFY `accid` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `activities`
--
ALTER TABLE `activities`
ADD CONSTRAINT `FK_activities_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `contestants`
--
ALTER TABLE `contestants`
ADD CONSTRAINT `FK_contestants_1` FOREIGN KEY (`eventid`) REFERENCES `events` (`eventid`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `FK_contestants_2` FOREIGN KEY (`departmentid`) REFERENCES `departments` (`departmentid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `criteria`
--
ALTER TABLE `criteria`
ADD CONSTRAINT `FK_criteria_1` FOREIGN KEY (`eventid`) REFERENCES `events` (`eventid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `judges`
--
ALTER TABLE `judges`
ADD CONSTRAINT `FK_judges_1` FOREIGN KEY (`eventid`) REFERENCES `events` (`eventid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `scores`
--
ALTER TABLE `scores`
ADD CONSTRAINT `FK_scores_1` FOREIGN KEY (`eventid`) REFERENCES `events` (`eventid`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `FK_scores_2` FOREIGN KEY (`judgeid`) REFERENCES `judges` (`judgeid`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `FK_scores_3` FOREIGN KEY (`criteriaid`) REFERENCES `criteria` (`criteriaid`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `FK_scores_4` FOREIGN KEY (`contestantid`) REFERENCES `contestants` (`contestantid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `useraccounts`
--
ALTER TABLE `useraccounts`
ADD CONSTRAINT `FK_useraccounts_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
