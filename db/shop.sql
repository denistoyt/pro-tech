-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 22 2023 г., 17:43
-- Версия сервера: 5.7.39
-- Версия PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `shop`
--

-- --------------------------------------------------------

--
-- Структура таблицы `cart`
--

CREATE TABLE `cart` (
  `id_cart_item` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `items`
--

CREATE TABLE `items` (
  `id_item` int(11) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `item_art_numb` int(8) NOT NULL,
  `item_img` varchar(255) NOT NULL,
  `item_img_alt` varchar(255) NOT NULL,
  `item_descr` text NOT NULL,
  `item_cost` int(11) NOT NULL,
  `item_category` enum('laptop','phone') NOT NULL DEFAULT 'laptop'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `items`
--

INSERT INTO `items` (`id_item`, `item_name`, `item_art_numb`, `item_img`, `item_img_alt`, `item_descr`, `item_cost`, `item_category`) VALUES
(1, '13.3\" Ноутбук Irbis NB77 черный', 36413970, 'img/laptops/Irbis-NB77.png', 'Irbis-NB77', 'HD (1366x768), TN+film, Intel Atom Z3735F, ядра: 4 х 1.33 ГГц, RAM 2 ГБ, eMMC 32 ГБ, Intel HD Graphics , Windows 10 Home Single Language', 14999, 'laptop'),
(2, '14\" Ноутбук Irbis NB283 серый', 95704882, 'img/laptops/Irbis-NB283.png', 'Irbis-NB283', 'HD (1366x768), IPS, Intel Celeron 3350, ядра: 2 х 1.1 ГГц, RAM 4 ГБ, eMMC 128 ГБ, Intel HD Graphics 500 , Windows 10 Pro', 15999, 'laptop'),
(3, '15.6\" Ноутбук Irbis NB290 черный', 10825570, 'img/laptops/Irbis-NB290.png', 'Irbis-NB290', '3200x1800, IPS, Intel Celeron N4020, ядра: 2 х 1.1 ГГц, RAM 4 ГБ, eMMC 128 ГБ, Intel UHD Graphics 600 , Windows 10 Home Single Language', 21999, 'laptop'),
(4, '17.3\" Ноутбук MSI CreatorPro X17 A12UMS-205RU черный', 49878151, 'img/laptops/MSI-CreatorPro-X17-A12UMS-205RU.png', 'MSI-CreatorPro-X17-A12UMS-205RU', 'Ultra HD 4K (3840x2160), IPS, Intel Core i9-12900HX, ядра: 8 + 8 х 2.3 ГГц, RAM 64 ГБ, SSD 2000 ГБ, RTX A5500 16 ГБ, Windows 11 Pro', 379999, 'laptop'),
(5, '16\" Ноутбук Lenovo Legion 7 16ACHg6 серый', 73545826, 'img/laptops/Lenovo-Legion-7-16ACHg6.png', 'Lenovo-Legion-7-16ACHg6', '2560x1600, IPS, AMD Ryzen 9 5900HX, ядра: 8 х 3.3 ГГц, RAM 32 ГБ, SSD 1000 ГБ, GeForce RTX 3080 для ноутбуков 16 ГБ, Windows 11 Home Single Language', 234999, 'laptop'),
(6, '5\" Смартфон DEXP A350 MIX 32 ГБ розовый', 9143932, 'img/phones/DEXP-A350-MIX.png', 'DEXP-A350-MIX', '4x(1.3 ГГц), 1 Гб, 2 SIM, TN, 960x480, камера 2 Мп, 3G, GPS, FM, 2500 мА*ч', 3199, 'phone'),
(7, '6.39\" Смартфон Oukitel C21 Pro 64 ГБ зеленый', 6248371, 'img/phones/Oukitel-C21-Pro.png', 'Oukitel-C21-Pro', '8x(2 ГГц, 1.5 ГГц), 4 Гб, 2 SIM, IPS, 1560x720, камера 21+2+0.3 Мп, 4G, GPS, 4000 мА*ч', 8199, 'phone'),
(8, '6.82\" Смартфон TCL 20 SE 64 ГБ черный', 6311673, 'img/phones/TCL-20-SE.png', 'TCL-20-SE', '8x(1.8 ГГц), 4 Гб, 2 SIM, IPS, 1640х720, камера 16+5+2+2 Мп, NFC, 4G, GPS, FM, 5000 мА*ч', 12899, 'phone'),
(9, '6.1\" Смартфон Apple iPhone 14 Pro 1000 ГБ золотистый', 7812930, 'img/phones/Apple-iPhone-14-Pro-1000-ГБ-золотистый.png', 'Apple-iPhone-14-Pro-1000-ГБ-золотистый', '6, OLED, 2556х1179, камера 48+12+12 Мп, NFC, 5G, GPS', 169999, 'phone'),
(10, '7.8\" Смартфон HUAWEI Mate Xs 2 512 ГБ белый', 4839839, 'img/phones/HUAWEI-Mate-Xs-2-512-ГБ-белый.png', 'HUAWEI-Mate-Xs-2-512-ГБ-белый', '8x(2.84 ГГц, 2.42 ГГц), 8 Гб, 2 SIM, OLED, 2480х2200, камера 50+13+8 Мп, NFC, 4G, GPS, 4600 мА*ч', 129999, 'phone');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id_order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id_order`) VALUES
(1);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `prof_img` varchar(255) NOT NULL,
  `user_login` varchar(255) NOT NULL,
  `user_pass` varchar(255) NOT NULL,
  `user_orders` int(11) DEFAULT NULL,
  `user_fname` varchar(255) DEFAULT NULL,
  `user_sname` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `t_number` varchar(255) NOT NULL,
  `city` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id_user`, `prof_img`, `user_login`, `user_pass`, `user_orders`, `user_fname`, `user_sname`, `email`, `t_number`, `city`) VALUES
(2, '../img/users_img/denisto_id(2).jpg', 'denisto', '044a23cadb567653eb51d4eb40acaa88', NULL, 'Денис', 'Ефимов', 'denistoplay23@mail.ru', '+7 (950) 198 – 86 – 82', 'Нижний Тагил'),
(3, '../img/default-user-photo.jpg', 'sasha', '07e87c2f4fc7f7c96116d8e2a92790f5', NULL, 'Александр', 'Петров', 'petrov223@yandex.ru', '+7 (999) 888 – 55 – 32', 'Екатеринбург'),
(4, '../img/default-user-photo.jpg', 'max', '7e05d6f828574fbc975a896b25bb011e', NULL, NULL, NULL, 'max@mail.ru', '+7 (999) 999 – 99 – 99', NULL);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id_cart_item`),
  ADD KEY `item_id` (`item_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id_item`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `user_orders` (`user_orders`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `cart`
--
ALTER TABLE `cart`
  MODIFY `id_cart_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT для таблицы `items`
--
ALTER TABLE `items`
  MODIFY `id_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
