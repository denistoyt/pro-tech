-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 17 2023 г., 13:23
-- Версия сервера: 5.7.33
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `is41_shop`
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
  `item_descr` text NOT NULL,
  `item_cost` int(11) NOT NULL,
  `item_category` enum('laptop','phone') NOT NULL DEFAULT 'laptop'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `items`
--

INSERT INTO `items` (`id_item`, `item_name`, `item_art_numb`, `item_img`, `item_descr`, `item_cost`, `item_category`) VALUES
(1, '13.3\" Ноутбук Irbis NB77 черный', 36413970, 'img/laptops/Irbis NB77.webp', 'HD (1366x768), TN+film, Intel Atom Z3735F, ядра: 4 х 1.33 ГГц, RAM 2 ГБ, eMMC 32 ГБ, Intel HD Graphics , Windows 10 Home Single Language', 14999, 'laptop'),
(2, '14\" Ноутбук Irbis NB283 серый', 95704882, 'img/laptops/Irbis NB283.webp', 'HD (1366x768), IPS, Intel Celeron 3350, ядра: 2 х 1.1 ГГц, RAM 4 ГБ, eMMC 128 ГБ, Intel HD Graphics 500 , Windows 10 Pro', 15999, 'laptop'),
(3, '15.6\" Ноутбук Irbis NB290 черный', 10825570, 'img/laptops/Irbis NB290.webp', '3200x1800, IPS, Intel Celeron N4020, ядра: 2 х 1.1 ГГц, RAM 4 ГБ, eMMC 128 ГБ, Intel UHD Graphics 600 , Windows 10 Home Single Language', 21999, 'laptop'),
(4, '17.3\" Ноутбук MSI CreatorPro X17 A12UMS-205RU черный', 49878151, 'img/laptops/MSI CreatorPro X17 A12UMS-205RU.webp', 'Ultra HD 4K (3840x2160), IPS, Intel Core i9-12900HX, ядра: 8 + 8 х 2.3 ГГц, RAM 64 ГБ, SSD 2000 ГБ, RTX A5500 16 ГБ, Windows 11 Pro', 379999, 'laptop'),
(5, '16\" Ноутбук Lenovo Legion 7 16ACHg6 серый', 73545826, 'img/laptops/Lenovo Legion 7 16ACHg6.webp', '2560x1600, IPS, AMD Ryzen 9 5900HX, ядра: 8 х 3.3 ГГц, RAM 32 ГБ, SSD 1000 ГБ, GeForce RTX 3080 для ноутбуков 16 ГБ, Windows 11 Home Single Language', 234999, 'laptop');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id_order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `user_login` varchar(255) NOT NULL,
  `user_pass` varchar(255) NOT NULL,
  `user_orders` int(11) NOT NULL,
  `user_fname` varchar(255) NOT NULL,
  `user_sname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  MODIFY `id_cart_item` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `items`
--
ALTER TABLE `items`
  MODIFY `id_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id_item`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`);

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_orders`) REFERENCES `orders` (`id_order`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
