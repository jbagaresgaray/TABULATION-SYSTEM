-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 20, 2015 at 09:51 PM
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
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`actid`, `actname`, `actstartdate`, `actenddate`, `userid`) VALUES
(82, 'PALAKASAN 2015', '03-02-2015', '02-02-2015', 1),
(89, 'palakasan 3', '08/05/2015', '08/28/2015', 1);

-- --------------------------------------------------------

--
-- Table structure for table `contestants`
--

CREATE TABLE IF NOT EXISTS `contestants` (
  `contestantid` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL DEFAULT '',
  `eventid` int(10) unsigned NOT NULL DEFAULT '0',
  `departmentid` int(10) unsigned NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contestants`
--

INSERT INTO `contestants` (`contestantid`, `name`, `eventid`, `departmentid`) VALUES
(1, 'dhan tagailo', 20, 1),
(2, 'kissai rance', 20, 1),
(17, 'marvee abas', 18, 1),
(22, 'dan vinent tagailo', 18, 1),
(24, 'dhan vincent', 18, 1),
(25, 'jason statham', 19, 1),
(27, 'dhan', 19, 1),
(31, 'saSASA', 20, 1);

-- --------------------------------------------------------

--
-- Table structure for table `criteria`
--

CREATE TABLE IF NOT EXISTS `criteria` (
  `criteriaid` int(10) unsigned NOT NULL,
  `criterianame` varchar(50) NOT NULL DEFAULT '',
  `percentage` double NOT NULL DEFAULT '0',
  `eventid` int(10) unsigned NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `criteria`
--

INSERT INTO `criteria` (`criteriaid`, `criterianame`, `percentage`, `eventid`) VALUES
(1, 'beauty', 23, 18),
(5, 'stage presence', 20, 18),
(8, 'charm', 60, 18),
(9, 'uniform', 90, 19),
(10, 'beauty', 23, 19),
(11, '.', 90, 22);

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE IF NOT EXISTS `departments` (
  `departmentid` int(10) unsigned NOT NULL,
  `departmentname` varchar(100) NOT NULL DEFAULT '',
  `departmentdesc` varchar(100) NOT NULL DEFAULT ''
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`departmentid`, `departmentname`, `departmentdesc`) VALUES
(1, 'Department 1', 'Department 1 description ...');

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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`eventid`, `eventname`, `eventdescription`, `eventdate`, `actid`) VALUES
(18, 'Miss Palakasan 2015', 'xxxxxxxxxx', '01-02-2015', 82),
(19, 'Basketball 2015', 'xxxxxxxxxx', '01-02-2015', 82),
(20, 'Volleyball 2015', 'xxxxxxxxxx', '01-02-2015', 82),
(21, 'Badminton 2015', 'xxxxxxxxxx', '01-02-2015', 82),
(22, 'Cheerlaeding 2015', 'xxxxxxxxxx', '01-02-2015', 82),
(29, 'AS', 'AsaSAs', '08/26/2015', 89);

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `judges`
--

INSERT INTO `judges` (`judgeid`, `judgefullname`, `judgeuname`, `judgepword`, `eventid`) VALUES
(3, 'grace tagailo', 'grace', 'grace', 18),
(4, 'glenda tagailo', 'glenda', 'glenda', 18),
(5, 'marjorie tagailo', 'marj', 'marj', 18),
(6, 'mona tagailo', 'mona', 'mona', 18),
(7, 'michelle tagailo', 'mich', 'mihc', 18);

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
  MODIFY `actid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=90;
--
-- AUTO_INCREMENT for table `contestants`
--
ALTER TABLE `contestants`
  MODIFY `contestantid` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT for table `criteria`
--
ALTER TABLE `criteria`
  MODIFY `criteriaid` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `departmentid` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `eventid` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `judges`
--
ALTER TABLE `judges`
  MODIFY `judgeid` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
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
-- Constraints for table `useraccounts`
--
ALTER TABLE `useraccounts`
ADD CONSTRAINT `FK_useraccounts_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
