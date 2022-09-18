-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 18, 2022 at 09:29 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `twitter_clone_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `blocked_users`
--

CREATE TABLE `blocked_users` (
  `userid` int(11) NOT NULL,
  `blockinguserid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blocked_users`
--

INSERT INTO `blocked_users` (`userid`, `blockinguserid`) VALUES
(13, 1);

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `user_id` int(11) NOT NULL,
  `followed_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `liked_tweets`
--

CREATE TABLE `liked_tweets` (
  `tweet_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `liked_tweets`
--

INSERT INTO `liked_tweets` (`tweet_id`, `user_id`) VALUES
(1, 1),
(3, 1),
(37, 1),
(44, 13),
(45, 13),
(50, 13),
(51, 13);

-- --------------------------------------------------------

--
-- Table structure for table `tweets`
--

CREATE TABLE `tweets` (
  `id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `tweet_text` varchar(255) NOT NULL,
  `picture_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tweets`
--

INSERT INTO `tweets` (`id`, `users_id`, `tweet_text`, `picture_url`) VALUES
(1, 1, 'This is the first tweet', 'none'),
(2, 2, 'otheruser\'s tweet', 'none'),
(3, 1, 'asdasd', 'none'),
(16, 3, 'third tweet', 'none'),
(30, 1, 'postman test', 'none'),
(31, 1, 'asdasdasd', 'none'),
(37, 1, 'test image', '../frontend/content/uploadedimages/2eceebb2bb3c80aa771ba18e93ecb8e4.jpg'),
(38, 1, 'l3ama', '../frontend/content/uploadedimages/b577a767093d9524a1e3ba10651b65d6.jpg'),
(39, 13, 'asd', 'none'),
(40, 13, 'asdasd', 'none'),
(41, 13, 'asdasd', 'none'),
(42, 13, 'asdasd', 'none'),
(43, 13, 'sasd', 'none'),
(44, 13, 'sasd', 'none'),
(45, 13, 'sasd', 'none'),
(46, 13, 'sasd', 'none'),
(47, 13, 'asd', 'none'),
(48, 13, 'req', 'none'),
(49, 13, 'sasdasdddddddddddddddddddsadddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddsasdasdddddddddddddddddddsadddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddsasdasdddddddddddddddddddsadddddddddddddddddddddddddddddddd', 'none'),
(50, 13, 'asd', 'none'),
(51, 13, 'asdtest noqw', 'none'),
(52, 13, 'astest', '../frontend/content/uploadedimages/2eceebb2bb3c80aa771ba18e93ecb8e4.jpg'),
(53, 13, 'test iamge 9/18/2022', '../frontend/content/uploadedimages/3cf28d0f89755ae5d872073222e15c27.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tweet_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `fname`, `lname`, `email`, `password`, `tweet_count`) VALUES
(1, 'kroozeraid', 'moh', 'nas', 'kroozeraid@gmail.com', 'thepass', 0),
(2, 'otheruser', 'ihab', 'last', 'other@email.com', 'thepassword', 0),
(3, 'third', 'john', 'doe', 'third@email.com', 'password', 0),
(10, 'croozer', '', '', 'croozer@gmail.com', 'asdasd', 0),
(11, 'test', 'test', 'test', 'test', 'test', 0),
(12, 'otheruser2', 'asd', '', 'asd@gmail.com', 'ba3c83348bddf7b368b478ac06d3340e', 0),
(13, 'kroozeraid2', 'asd', 'asd', 'asd2@gmail.com', 'a8f5f167f44f4964e6c998dee827110c', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blocked_users`
--
ALTER TABLE `blocked_users`
  ADD PRIMARY KEY (`userid`,`blockinguserid`);

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`user_id`,`followed_user_id`);

--
-- Indexes for table `liked_tweets`
--
ALTER TABLE `liked_tweets`
  ADD PRIMARY KEY (`tweet_id`,`user_id`);

--
-- Indexes for table `tweets`
--
ALTER TABLE `tweets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tweets`
--
ALTER TABLE `tweets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
