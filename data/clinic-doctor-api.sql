-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               10.2.22-MariaDB - mariadb.org binary distribution
-- Операционная система:         Win64
-- HeidiSQL Версия:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Дамп структуры базы данных clinic-doctor-api
CREATE DATABASE IF NOT EXISTS `clinic-doctor-api` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `clinic-doctor-api`;

-- Дамп структуры для таблица clinic-doctor-api.clinic-doctor
CREATE TABLE IF NOT EXISTS `clinic-doctor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clinic` int(11) DEFAULT NULL,
  `doctor` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `clinic-doctor` (`doctor`,`clinic`) USING BTREE,
  KEY `clinic` (`clinic`),
  KEY `doctor` (`doctor`),
  CONSTRAINT `clinic` FOREIGN KEY (`clinic`) REFERENCES `clinics` (`id`) ON DELETE CASCADE,
  CONSTRAINT `doctor` FOREIGN KEY (`doctor`) REFERENCES `doctors` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы clinic-doctor-api.clinic-doctor: ~14 rows (приблизительно)
/*!40000 ALTER TABLE `clinic-doctor` DISABLE KEYS */;
REPLACE INTO `clinic-doctor` (`id`, `clinic`, `doctor`) VALUES
	(6, 3, 1),
	(10, 2, 2),
	(2, 1, 3),
	(13, 2, 3),
	(1, 3, 3),
	(14, 1, 4),
	(18, 3, 4),
	(15, 2, 5),
	(16, 1, 6),
	(7, 2, 6),
	(9, 1, 8),
	(8, 3, 9),
	(5, 2, 10),
	(17, 3, 10);
/*!40000 ALTER TABLE `clinic-doctor` ENABLE KEYS */;

-- Дамп структуры для таблица clinic-doctor-api.clinics
CREATE TABLE IF NOT EXISTS `clinics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы clinic-doctor-api.clinics: ~3 rows (приблизительно)
/*!40000 ALTER TABLE `clinics` DISABLE KEYS */;
REPLACE INTO `clinics` (`id`, `name`) VALUES
	(1, 'Kyiv Vertebrology clinic'),
	(2, 'Kyiv General clinic'),
	(3, 'Kyiv Dental clinic');
/*!40000 ALTER TABLE `clinics` ENABLE KEYS */;

-- Дамп структуры для таблица clinic-doctor-api.doctor-service
CREATE TABLE IF NOT EXISTS `doctor-service` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doctor` int(11) DEFAULT NULL,
  `service` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `doctor-service` (`service`,`doctor`) USING BTREE,
  KEY `doctors` (`doctor`),
  KEY `service` (`service`),
  CONSTRAINT `doctors` FOREIGN KEY (`doctor`) REFERENCES `doctors` (`id`) ON DELETE CASCADE,
  CONSTRAINT `services` FOREIGN KEY (`service`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы clinic-doctor-api.doctor-service: ~28 rows (приблизительно)
/*!40000 ALTER TABLE `doctor-service` DISABLE KEYS */;
REPLACE INTO `doctor-service` (`id`, `doctor`, `service`) VALUES
	(6, 3, 1),
	(5, 1, 2),
	(83, 3, 2),
	(3, 9, 2),
	(1, 3, 3),
	(2, 8, 3),
	(88, 4, 4),
	(89, 6, 5),
	(78, 9, 7),
	(90, 5, 8),
	(84, 3, 9),
	(81, 7, 9),
	(7, 7, 11),
	(77, 7, 12),
	(4, 1, 15),
	(87, 3, 15),
	(80, 2, 18),
	(79, 4, 18),
	(82, 8, 18),
	(92, 1, 20),
	(76, 5, 20),
	(96, 4, 22),
	(95, 2, 24),
	(91, 5, 25),
	(85, 2, 29),
	(93, 3, 32),
	(94, 4, 32),
	(86, 1, 34);
/*!40000 ALTER TABLE `doctor-service` ENABLE KEYS */;

-- Дамп структуры для таблица clinic-doctor-api.doctors
CREATE TABLE IF NOT EXISTS `doctors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы clinic-doctor-api.doctors: ~10 rows (приблизительно)
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
REPLACE INTO `doctors` (`id`, `name`) VALUES
	(1, 'Авершин Валерий Иванович'),
	(2, 'Арендарь Елена Анатольевна'),
	(3, 'Бацей Иван Сидорович'),
	(4, 'Билинский Олег Львович'),
	(5, 'Бондаренко Мария Сергеевна'),
	(6, 'Ринзберг Борис Сергеевич'),
	(7, 'Легкая Светлана Борисовна'),
	(8, 'Запорожец Татьяна Юрьевна'),
	(9, 'Харлап Игорь Васильевич'),
	(10, 'Мельников Александр Владиславович');
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;

-- Дамп структуры для таблица clinic-doctor-api.services
CREATE TABLE IF NOT EXISTS `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы clinic-doctor-api.services: ~38 rows (приблизительно)
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
REPLACE INTO `services` (`id`, `name`) VALUES
	(1, 'Аллергология'),
	(2, 'Вертебрология'),
	(3, 'Гастроэнтерология'),
	(4, 'Гематология'),
	(5, 'Генетика'),
	(6, 'Гинекология'),
	(7, 'Гепатология'),
	(8, 'Дерматовенерология'),
	(9, 'Дерматология'),
	(10, 'Диетология'),
	(11, 'Женская консультация'),
	(12, 'Инфектология'),
	(13, 'Кардиология'),
	(14, 'Консультант по грудному вскармливанию'),
	(15, 'Косметология'),
	(16, 'Маммология'),
	(17, 'Неврология'),
	(18, 'Нефрология'),
	(19, 'Онкология'),
	(20, 'Онлайн-консультации врачей'),
	(21, 'Ортопедия и травматология'),
	(22, 'Отоларингология'),
	(23, 'Офтальмология'),
	(24, 'Пластическая хирургия'),
	(25, 'Проктология'),
	(26, 'Психотерапия'),
	(27, 'Пульмонология'),
	(28, 'Реабилитология'),
	(29, 'Ревматология'),
	(30, 'Репродуктология'),
	(31, 'Сомнология'),
	(32, 'Сурдология'),
	(33, 'Терапия'),
	(34, 'Трихология'),
	(35, 'Урология'),
	(36, 'Флебология'),
	(37, 'Хирургия'),
	(38, 'Эндокринология');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;

-- Дамп структуры для таблица clinic-doctor-api.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы clinic-doctor-api.users: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
REPLACE INTO `users` (`id`, `login`, `password`) VALUES
	(1, 'admin', '123456');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
