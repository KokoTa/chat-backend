/*
 Navicat Premium Data Transfer

 Source Server         : docker-mysql
 Source Server Type    : MySQL
 Source Server Version : 80021
 Source Host           : localhost:3306
 Source Schema         : egg

 Target Server Type    : MySQL
 Target Server Version : 80021
 File Encoding         : 65001

 Date: 12/11/2020 12:16:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for SequelizeMeta
-- ----------------------------
DROP TABLE IF EXISTS `SequelizeMeta`;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of SequelizeMeta
-- ----------------------------
BEGIN;
INSERT INTO `SequelizeMeta` VALUES ('20201030013731-init-user.js');
INSERT INTO `SequelizeMeta` VALUES ('20201105065302-friend.js');
INSERT INTO `SequelizeMeta` VALUES ('20201105065303-friend.js');
INSERT INTO `SequelizeMeta` VALUES ('20201105065309-apply.js');
INSERT INTO `SequelizeMeta` VALUES ('20201106021750-friend-apply-add-deleted_at.js');
INSERT INTO `SequelizeMeta` VALUES ('20201110060737-report.js');
INSERT INTO `SequelizeMeta` VALUES ('20201110070840-tag.js');
INSERT INTO `SequelizeMeta` VALUES ('20201110070914-friend_tag.js');
INSERT INTO `SequelizeMeta` VALUES ('20201111034126-friend-tag-apply-add-deleted_at.js');
COMMIT;

-- ----------------------------
-- Table structure for apply
-- ----------------------------
DROP TABLE IF EXISTS `apply`;
CREATE TABLE `apply` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL COMMENT '申请人id',
  `friend_id` int unsigned NOT NULL COMMENT '好友id',
  `lookme` int NOT NULL DEFAULT '1' COMMENT '看我',
  `lookhim` int NOT NULL DEFAULT '1' COMMENT '看他',
  `status` enum('pending','refuse','agree','ignore') NOT NULL DEFAULT 'pending' COMMENT '申请状态',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `friend_id` (`friend_id`),
  CONSTRAINT `apply_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `apply_ibfk_2` FOREIGN KEY (`friend_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of apply
-- ----------------------------
BEGIN;
INSERT INTO `apply` VALUES (1, 14, 15, 1, 1, 'agree', '2020-11-06 10:19:32', '2020-11-09 15:52:32', NULL);
INSERT INTO `apply` VALUES (2, 14, 16, 1, 1, 'pending', '2020-11-06 10:20:25', '2020-11-06 10:20:25', NULL);
INSERT INTO `apply` VALUES (3, 16, 15, 1, 1, 'agree', '2020-11-10 09:27:55', '2020-11-10 09:40:06', NULL);
INSERT INTO `apply` VALUES (4, 15, 16, 1, 1, 'pending', '2020-11-09 14:58:19', '2020-11-09 14:58:19', NULL);
COMMIT;

-- ----------------------------
-- Table structure for friend
-- ----------------------------
DROP TABLE IF EXISTS `friend`;
CREATE TABLE `friend` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL COMMENT '用户id',
  `friend_id` int unsigned NOT NULL COMMENT '好友id',
  `lookme` int NOT NULL DEFAULT '1' COMMENT '看我',
  `lookhim` int NOT NULL DEFAULT '1' COMMENT '看他',
  `star` int NOT NULL DEFAULT '0' COMMENT '是否为星标朋友：0否1是',
  `isblack` int NOT NULL DEFAULT '0' COMMENT '是否加入黑名单：0否1是',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `friend_id` (`friend_id`),
  CONSTRAINT `friend_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `friend_ibfk_2` FOREIGN KEY (`friend_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of friend
-- ----------------------------
BEGIN;
INSERT INTO `friend` VALUES (1, 14, 15, 1, 1, 0, 0, '2020-11-09 15:52:32', '2020-11-09 15:52:32', NULL);
INSERT INTO `friend` VALUES (2, 15, 14, 0, 0, 1, 0, '2020-11-09 15:52:32', '2020-11-10 12:12:08', NULL);
INSERT INTO `friend` VALUES (3, 16, 15, 1, 1, 0, 0, '2020-11-10 09:40:06', '2020-11-10 09:40:06', NULL);
INSERT INTO `friend` VALUES (4, 15, 16, 1, 1, 0, 0, '2020-11-10 09:40:06', '2020-11-10 09:40:06', NULL);
COMMIT;

-- ----------------------------
-- Table structure for friend_tag
-- ----------------------------
DROP TABLE IF EXISTS `friend_tag`;
CREATE TABLE `friend_tag` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `friend_id` int unsigned NOT NULL COMMENT '好友id',
  `tag_id` int unsigned NOT NULL COMMENT '标签id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `friend_id` (`friend_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `friend_tag_ibfk_1` FOREIGN KEY (`friend_id`) REFERENCES `friend` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `friend_tag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of friend_tag
-- ----------------------------
BEGIN;
INSERT INTO `friend_tag` VALUES (1, 2, 1, '2020-11-11 11:47:36', '2020-11-11 11:47:36', NULL);
INSERT INTO `friend_tag` VALUES (2, 2, 2, '2020-11-11 11:47:36', '2020-11-11 11:47:36', '2020-11-11 11:48:19');
INSERT INTO `friend_tag` VALUES (3, 2, 2, '2020-11-11 12:30:50', '2020-11-11 12:30:50', '2020-11-11 14:26:00');
COMMIT;

-- ----------------------------
-- Table structure for report
-- ----------------------------
DROP TABLE IF EXISTS `report`;
CREATE TABLE `report` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL COMMENT '用户id',
  `reported_id` int unsigned NOT NULL COMMENT '被举报人id',
  `reported_type` enum('user','group') NOT NULL DEFAULT 'user' COMMENT '举报类型',
  `content` text COMMENT '举报内容',
  `category` varchar(10) DEFAULT '' COMMENT '举报分类',
  `status` enum('pending','refuse','agree') NOT NULL DEFAULT 'pending' COMMENT '举报状态',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `report_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of report
-- ----------------------------
BEGIN;
INSERT INTO `report` VALUES (1, 15, 14, 'user', 'aaa', 'bbb', 'pending', '2020-11-10 15:00:50', '2020-11-10 15:00:50', NULL);
COMMIT;

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '标签名称',
  `user_id` int unsigned NOT NULL COMMENT '用户id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tag_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of tag
-- ----------------------------
BEGIN;
INSERT INTO `tag` VALUES (1, '标签1', 15, '2020-11-11 11:44:03', '2020-11-11 11:44:03', NULL);
INSERT INTO `tag` VALUES (2, '标签2', 15, '2020-11-11 11:44:03', '2020-11-11 11:44:03', NULL);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL DEFAULT '' COMMENT '用户名称',
  `nickname` varchar(30) NOT NULL DEFAULT '' COMMENT '用户昵称',
  `email` varchar(160) NOT NULL DEFAULT '' COMMENT '用户邮箱',
  `password` varchar(200) NOT NULL DEFAULT '' COMMENT '用户密码',
  `avatar` varchar(200) NOT NULL DEFAULT '' COMMENT '用户头像',
  `phone` varchar(20) NOT NULL DEFAULT '' COMMENT '用户手机',
  `sex` enum('男','女','保密') NOT NULL DEFAULT '男' COMMENT '用户性别',
  `status` int NOT NULL DEFAULT '1' COMMENT '状态 0禁用 1启用',
  `sign` varchar(200) NOT NULL DEFAULT '' COMMENT '个性签名',
  `area` varchar(200) NOT NULL DEFAULT '' COMMENT '地区',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `nickname` (`nickname`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (14, '测试5', '昵称5', '邮箱5', 'e0bc60c82713f64ef8a57c0c40d02ce24fd0141d5cc3086259c19b1e62a62bea', '', '', '男', 1, '', '', '2020-11-04 15:13:14', '2020-11-04 15:13:14', NULL);
INSERT INTO `user` VALUES (15, '测试测试6', '昵称测试6', '邮箱邮箱6', 'e0bc60c82713f64ef8a57c0c40d02ce24fd0141d5cc3086259c19b1e62a62bea', '', '', '男', 1, '', '', '2020-11-05 14:51:40', '2020-11-05 14:51:40', NULL);
INSERT INTO `user` VALUES (16, '测试测试7', '昵称测试7', '邮箱邮箱7', 'e0bc60c82713f64ef8a57c0c40d02ce24fd0141d5cc3086259c19b1e62a62bea', '', '', '男', 1, '', '', '2020-11-05 14:51:45', '2020-11-05 14:51:45', NULL);
INSERT INTO `user` VALUES (17, '测试测试8', '昵称测试8', '邮箱邮箱8', 'e0bc60c82713f64ef8a57c0c40d02ce24fd0141d5cc3086259c19b1e62a62bea', '', '', '男', 1, '', '', '2020-11-06 16:43:45', '2020-11-06 16:43:45', NULL);
INSERT INTO `user` VALUES (18, '测试测试9', '昵称测试9', '邮箱邮箱9', 'e0bc60c82713f64ef8a57c0c40d02ce24fd0141d5cc3086259c19b1e62a62bea', '', '', '男', 1, '', '', '2020-11-09 14:57:30', '2020-11-09 14:57:30', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
