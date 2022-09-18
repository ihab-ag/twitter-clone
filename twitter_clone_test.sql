-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 18, 2022 at 07:54 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `user_id` int(11) NOT NULL,
  `followed_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`user_id`, `followed_user_id`) VALUES
(13, 2),
(14, 1),
(19, 19),
(20, 19);

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
(65, 20),
(66, 19),
(66, 20),
(67, 19),
(67, 20),
(69, 20);

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
(65, 19, 'test', 'none'),
(66, 19, 'asddsa', 'none'),
(67, 19, 'test 222', 'none'),
(68, 20, 'My tweet, tested now', 'none'),
(69, 20, 'tweet test', '../frontend/content/uploadedimages/2eceebb2bb3c80aa771ba18e93ecb8e4.jpg'),
(70, 20, 'asd', 'none'),
(71, 20, 'another test', 'none');

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
  `bio` varchar(255) NOT NULL,
  `profile_pic` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tweet_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `fname`, `lname`, `email`, `bio`, `profile_pic`, `password`, `tweet_count`) VALUES
(19, 'croozer', 'asd', 'Nassar', 'kroozeraid2@gmail.com', 'bio', '../frontend/content/uploadedimages/875ee9a2699bbea645d00932fca312b0.jpg', '1a1dc91c907325c69271ddf0c944bc72', 0),
(20, 'seconduser', 'Display name', 'user', 'second@gmail.com', 'Bio', '../frontend/content/uploadedimages/3cf28d0f89755ae5d872073222e15c27.jpg', '5f4dcc3b5aa765d61d8327deb882cf99', 0);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
