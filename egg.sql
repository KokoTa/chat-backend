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
 
 Date: 03/12/2020 15:04:36
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
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
-- ----------------------------
-- Records of SequelizeMeta
-- ----------------------------
BEGIN;
INSERT INTO `SequelizeMeta`
VALUES ('20201030013731-init-user.js');
INSERT INTO `SequelizeMeta`
VALUES ('20201105065303-friend.js');
INSERT INTO `SequelizeMeta`
VALUES ('20201105065309-apply.js');
INSERT INTO `SequelizeMeta`
VALUES ('20201110060737-report.js');
INSERT INTO `SequelizeMeta`
VALUES ('20201110070840-tag.js');
INSERT INTO `SequelizeMeta`
VALUES ('20201110070914-friend_tag.js');
INSERT INTO `SequelizeMeta`
VALUES ('20201117070450-group.js');
INSERT INTO `SequelizeMeta`
VALUES ('20201117070456-group-user.js');
INSERT INTO `SequelizeMeta`
VALUES ('20201125010924-fava.js');
INSERT INTO `SequelizeMeta`
VALUES ('20201125030159-moment.js');
INSERT INTO `SequelizeMeta`
VALUES ('20201125030206-moment_timeline.js');
INSERT INTO `SequelizeMeta`
VALUES ('20201125030210-moment_like.js');
INSERT INTO `SequelizeMeta`
VALUES ('20201125030215-moment_comment.js');
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
  `status` enum('pending', 'refuse', 'agree', 'ignore') NOT NULL DEFAULT 'pending' COMMENT '申请状态',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `friend_id` (`friend_id`),
  CONSTRAINT `apply_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `apply_ibfk_2` FOREIGN KEY (`friend_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
-- ----------------------------
-- Records of apply
-- ----------------------------
BEGIN;
INSERT INTO `apply`
VALUES (
    1,
    14,
    15,
    1,
    1,
    'agree',
    '2020-11-06 10:19:32',
    '2020-11-09 15:52:32',
    NULL
  );
INSERT INTO `apply`
VALUES (
    2,
    14,
    16,
    1,
    1,
    'pending',
    '2020-11-06 10:20:25',
    '2020-11-06 10:20:25',
    NULL
  );
INSERT INTO `apply`
VALUES (
    3,
    16,
    15,
    1,
    1,
    'agree',
    '2020-11-10 09:27:55',
    '2020-11-10 09:40:06',
    NULL
  );
INSERT INTO `apply`
VALUES (
    4,
    15,
    16,
    1,
    1,
    'pending',
    '2020-11-09 14:58:19',
    '2020-11-09 14:58:19',
    NULL
  );
COMMIT;
-- ----------------------------
-- Table structure for fava
-- ----------------------------
DROP TABLE IF EXISTS `fava`;
CREATE TABLE `fava` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `data` text NOT NULL COMMENT '内容',
  `type` enum(
    'emoticon',
    'text',
    'image',
    'video',
    'audio',
    'card'
  ) NOT NULL DEFAULT 'text' COMMENT '类型',
  `options` text NOT NULL COMMENT '其他参数',
  `user_id` int unsigned NOT NULL COMMENT '用户id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fava_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
-- ----------------------------
-- Records of fava
-- ----------------------------
BEGIN;
INSERT INTO `fava`
VALUES (
    1,
    'hello',
    'text',
    '{}',
    15,
    '2020-11-25 09:36:44',
    '2020-11-25 09:36:44',
    '2020-11-25 09:47:46'
  );
INSERT INTO `fava`
VALUES (
    2,
    'hello',
    'text',
    '{}',
    15,
    '2020-11-25 09:43:46',
    '2020-11-25 09:43:46',
    NULL
  );
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
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
-- ----------------------------
-- Records of friend
-- ----------------------------
BEGIN;
INSERT INTO `friend`
VALUES (
    1,
    14,
    15,
    1,
    1,
    0,
    0,
    '2020-11-09 15:52:32',
    '2020-11-09 15:52:32',
    NULL
  );
INSERT INTO `friend`
VALUES (
    2,
    15,
    14,
    0,
    0,
    1,
    0,
    '2020-11-09 15:52:32',
    '2020-11-10 12:12:08',
    NULL
  );
INSERT INTO `friend`
VALUES (
    3,
    16,
    15,
    1,
    1,
    0,
    0,
    '2020-11-10 09:40:06',
    '2020-11-10 09:40:06',
    NULL
  );
INSERT INTO `friend`
VALUES (
    4,
    15,
    16,
    1,
    1,
    0,
    0,
    '2020-11-10 09:40:06',
    '2020-11-10 09:40:06',
    NULL
  );
COMMIT;
-- ----------------------------
-- Table structure for friend_tag
-- ----------------------------
DROP TABLE IF EXISTS `friend_tag`;
CREATE TABLE `friend_tag` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `friend_id` int unsigned NOT NULL COMMENT '好友申请id',
  `tag_id` int unsigned NOT NULL COMMENT '标签id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `friend_id` (`friend_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `friend_tag_ibfk_1` FOREIGN KEY (`friend_id`) REFERENCES `friend` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `friend_tag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 22 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
-- ----------------------------
-- Records of friend_tag
-- ----------------------------
BEGIN;
INSERT INTO `friend_tag`
VALUES (
    20,
    2,
    22,
    '2020-12-03 14:41:39',
    '2020-12-03 14:41:39',
    NULL
  );
INSERT INTO `friend_tag`
VALUES (
    21,
    2,
    23,
    '2020-12-03 14:41:39',
    '2020-12-03 14:41:39',
    NULL
  );
COMMIT;
-- ----------------------------
-- Table structure for group
-- ----------------------------
DROP TABLE IF EXISTS `group`;
CREATE TABLE `group` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '群组名称',
  `avatar` varchar(200) DEFAULT '',
  `user_id` int unsigned NOT NULL COMMENT '群主id',
  `remark` text COMMENT '群公告',
  `invite_confirm` int NOT NULL DEFAULT '1' COMMENT '邀请确认',
  `status` int NOT NULL DEFAULT '1' COMMENT '状态',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `group_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 38 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
-- ----------------------------
-- Records of group
-- ----------------------------
BEGIN;
INSERT INTO `group`
VALUES (
    37,
    '测试测试6,测5,测试测试7',
    '群聊头图',
    15,
    NULL,
    1,
    1,
    '2020-11-19 11:25:09',
    '2020-11-19 11:25:09',
    NULL
  );
COMMIT;
-- ----------------------------
-- Table structure for group_user
-- ----------------------------
DROP TABLE IF EXISTS `group_user`;
CREATE TABLE `group_user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL COMMENT '用户id',
  `group_id` int unsigned NOT NULL COMMENT '群组id',
  `nickname` varchar(30) NOT NULL DEFAULT '' COMMENT '在群里的昵称',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `group_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `group_user_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 106 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
-- ----------------------------
-- Records of group_user
-- ----------------------------
BEGIN;
INSERT INTO `group_user`
VALUES (
    103,
    15,
    37,
    'Brain',
    '2020-11-19 11:25:09',
    '2020-11-20 16:57:36',
    NULL
  );
INSERT INTO `group_user`
VALUES (
    104,
    14,
    37,
    '',
    '2020-11-19 11:25:09',
    '2020-11-19 11:25:09',
    NULL
  );
INSERT INTO `group_user`
VALUES (
    105,
    16,
    37,
    '',
    '2020-11-19 11:25:09',
    '2020-11-19 11:25:09',
    NULL
  );
COMMIT;
-- ----------------------------
-- Table structure for moment
-- ----------------------------
DROP TABLE IF EXISTS `moment`;
CREATE TABLE `moment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL COMMENT '朋友圈内容',
  `image` text NOT NULL COMMENT '朋友圈图片',
  `video` varchar(255) NOT NULL DEFAULT '' COMMENT '朋友圈视频',
  `location` varchar(255) NOT NULL DEFAULT '' COMMENT '位置',
  `remind` varchar(255) NOT NULL DEFAULT '' COMMENT '提醒谁看',
  `see` varchar(255) NOT NULL DEFAULT 'all' COMMENT '谁可以看 all公开 none私密',
  `user_id` int unsigned NOT NULL COMMENT '用户id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `moment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
-- ----------------------------
-- Records of moment
-- ----------------------------
BEGIN;
INSERT INTO `moment`
VALUES (
    1,
    '朋友圈(所有人可见)',
    '',
    '',
    '',
    '',
    'all',
    15,
    '2020-11-25 14:53:03',
    '2020-11-25 14:53:03',
    NULL
  );
INSERT INTO `moment`
VALUES (
    2,
    '朋友圈(自己可见)',
    '',
    '',
    '',
    '',
    'none',
    15,
    '2020-11-25 14:55:27',
    '2020-11-25 14:55:27',
    NULL
  );
COMMIT;
-- ----------------------------
-- Table structure for moment_comment
-- ----------------------------
DROP TABLE IF EXISTS `moment_comment`;
CREATE TABLE `moment_comment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL COMMENT '评论用户id',
  `moment_id` int unsigned NOT NULL COMMENT '朋友圈消息id',
  `content` text NOT NULL COMMENT '评论内容',
  `reply_id` int NOT NULL DEFAULT '0' COMMENT '回复用户id 0顶级评论',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `moment_id` (`moment_id`),
  CONSTRAINT `moment_comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `moment_comment_ibfk_2` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
-- ----------------------------
-- Records of moment_comment
-- ----------------------------
BEGIN;
INSERT INTO `moment_comment`
VALUES (
    1,
    15,
    1,
    '评论',
    0,
    '2020-11-25 15:44:44',
    '2020-11-25 15:44:44',
    NULL
  );
INSERT INTO `moment_comment`
VALUES (
    2,
    14,
    1,
    '回复评论',
    15,
    '2020-11-25 15:44:44',
    '2020-11-25 15:44:44',
    NULL
  );
COMMIT;
-- ----------------------------
-- Table structure for moment_like
-- ----------------------------
DROP TABLE IF EXISTS `moment_like`;
CREATE TABLE `moment_like` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL COMMENT '点赞用户id',
  `moment_id` int unsigned NOT NULL COMMENT '朋友圈消息id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `moment_id` (`moment_id`),
  CONSTRAINT `moment_like_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `moment_like_ibfk_2` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
-- ----------------------------
-- Records of moment_like
-- ----------------------------
BEGIN;
INSERT INTO `moment_like`
VALUES (
    1,
    15,
    1,
    '2020-11-25 15:11:00',
    '2020-11-25 15:27:53',
    NULL
  );
COMMIT;
-- ----------------------------
-- Table structure for moment_timeline
-- ----------------------------
DROP TABLE IF EXISTS `moment_timeline`;
CREATE TABLE `moment_timeline` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL COMMENT '用户id',
  `moment_id` int unsigned NOT NULL COMMENT '朋友圈消息id',
  `own` int NOT NULL DEFAULT '0' COMMENT '是否是自己的 0否1是',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `moment_id` (`moment_id`),
  CONSTRAINT `moment_timeline_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `moment_timeline_ibfk_2` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
-- ----------------------------
-- Records of moment_timeline
-- ----------------------------
BEGIN;
INSERT INTO `moment_timeline`
VALUES (
    1,
    14,
    1,
    0,
    '2020-11-25 14:53:03',
    '2020-11-25 14:53:03',
    NULL
  );
INSERT INTO `moment_timeline`
VALUES (
    2,
    16,
    1,
    0,
    '2020-11-25 14:53:03',
    '2020-11-25 14:53:03',
    NULL
  );
INSERT INTO `moment_timeline`
VALUES (
    3,
    15,
    1,
    1,
    '2020-11-25 14:53:03',
    '2020-11-25 14:53:03',
    NULL
  );
INSERT INTO `moment_timeline`
VALUES (
    4,
    15,
    2,
    1,
    '2020-11-25 14:55:27',
    '2020-11-25 14:55:27',
    NULL
  );
COMMIT;
-- ----------------------------
-- Table structure for report
-- ----------------------------
DROP TABLE IF EXISTS `report`;
CREATE TABLE `report` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL COMMENT '用户id',
  `reported_id` int unsigned NOT NULL COMMENT '被举报人id',
  `reported_type` enum('user', 'group') NOT NULL DEFAULT 'user' COMMENT '举报类型',
  `content` text COMMENT '举报内容',
  `category` varchar(10) DEFAULT '' COMMENT '举报分类',
  `status` enum('pending', 'refuse', 'agree') NOT NULL DEFAULT 'pending' COMMENT '举报状态',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `report_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
-- ----------------------------
-- Records of report
-- ----------------------------
BEGIN;
INSERT INTO `report`
VALUES (
    1,
    15,
    14,
    'user',
    'aaa',
    'bbb',
    'pending',
    '2020-11-10 15:00:50',
    '2020-11-10 15:00:50',
    NULL
  );
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
) ENGINE = InnoDB AUTO_INCREMENT = 24 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
-- ----------------------------
-- Records of tag
-- ----------------------------
BEGIN;
INSERT INTO `tag`
VALUES (
    22,
    '标签1',
    15,
    '2020-12-03 14:41:39',
    '2020-12-03 14:41:39',
    NULL
  );
INSERT INTO `tag`
VALUES (
    23,
    '标签2',
    15,
    '2020-12-03 14:41:39',
    '2020-12-03 14:41:39',
    NULL
  );
COMMIT;
-- ----------------------------
-- Table structure for test_user
-- ----------------------------
DROP TABLE IF EXISTS `test_user`;
CREATE TABLE `test_user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) NOT NULL DEFAULT '',
  `age` int unsigned NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
-- ----------------------------
-- Records of test_user
-- ----------------------------
BEGIN;
INSERT INTO `test_user`
VALUES (1, 'user1', 24, NULL, NULL, NULL);
COMMIT;
-- ----------------------------
-- Table structure for test_user_desc
-- ----------------------------
DROP TABLE IF EXISTS `test_user_desc`;
CREATE TABLE `test_user_desc` (
  `id` int NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL DEFAULT '',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
-- ----------------------------
-- Records of test_user_desc
-- ----------------------------
BEGIN;
INSERT INTO `test_user_desc`
VALUES (1, '1', '我是测谁描述', NULL, NULL, NULL);
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
  `sex` enum('男', '女', '保密') NOT NULL DEFAULT '男' COMMENT '用户性别',
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
) ENGINE = InnoDB AUTO_INCREMENT = 25 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user`
VALUES (
    14,
    '测5',
    '昵称5',
    '邮箱5',
    'e0bc60c82713f64ef8a57c0c40d02ce24fd0141d5cc3086259c19b1e62a62bea',
    '',
    '',
    '男',
    1,
    '',
    '',
    '2020-11-04 15:13:14',
    '2020-11-04 15:13:14',
    NULL
  );
INSERT INTO `user`
VALUES (
    15,
    '测试测试6',
    '昵称测试6',
    '邮箱邮箱6',
    'e0bc60c82713f64ef8a57c0c40d02ce24fd0141d5cc3086259c19b1e62a62bea',
    '',
    '',
    '男',
    1,
    '',
    '',
    '2020-11-05 14:51:40',
    '2020-11-05 14:51:40',
    NULL
  );
INSERT INTO `user`
VALUES (
    16,
    '测试测试7',
    '昵称测试7',
    '邮箱邮箱7',
    'e0bc60c82713f64ef8a57c0c40d02ce24fd0141d5cc3086259c19b1e62a62bea',
    '',
    '',
    '男',
    1,
    '',
    '',
    '2020-11-05 14:51:45',
    '2020-11-05 14:51:45',
    NULL
  );
INSERT INTO `user`
VALUES (
    17,
    '测试测试8',
    '昵称测试8',
    '邮箱邮箱8',
    'e0bc60c82713f64ef8a57c0c40d02ce24fd0141d5cc3086259c19b1e62a62bea',
    '',
    '',
    '男',
    1,
    '',
    '',
    '2020-11-06 16:43:45',
    '2020-11-06 16:43:45',
    NULL
  );
INSERT INTO `user`
VALUES (
    18,
    '测试测试9',
    '昵称测试9',
    '邮箱邮箱9',
    'e0bc60c82713f64ef8a57c0c40d02ce24fd0141d5cc3086259c19b1e62a62bea',
    '',
    '',
    '男',
    1,
    '',
    '',
    '2020-11-09 14:57:30',
    '2020-11-09 14:57:30',
    NULL
  );
COMMIT;
SET FOREIGN_KEY_CHECKS = 1;