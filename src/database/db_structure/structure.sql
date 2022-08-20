-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-08-2022 a las 20:04:27
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `data_terra`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cities`
--

CREATE TABLE `cities` (
  `idCity` int(11) NOT NULL,
  `cityName` varchar(100) NOT NULL,
  `shippingCost` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `itempurchase`
--

CREATE TABLE `itempurchase` (
  `idItemPurchase` int(11) NOT NULL,
  `idProduct` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `idPurchaseDetail` int(45) DEFAULT NULL,
  `itemPrice` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productcategory`
--

CREATE TABLE `productcategory` (
  `idProductCategory` int(11) NOT NULL,
  `productCategoryName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `idProduct` int(11) NOT NULL,
  `productName` varchar(100) NOT NULL,
  `idProductCategory` int(11) NOT NULL,
  `productHarvest` int(11) NOT NULL,
  `productVariety` varchar(200) NOT NULL,
  `productBreeding` varchar(200) NOT NULL,
  `productGuard` varchar(45) NOT NULL,
  `productDescription` mediumtext NOT NULL,
  `productImg` varchar(200) NOT NULL,
  `productPrice` decimal(10,0) NOT NULL,
  `productStock` int(11) NOT NULL,
  `createAt` datetime DEFAULT NULL,
  `modifiedAt` datetime DEFAULT NULL,
  `softDelete` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchasedetail`
--

CREATE TABLE `purchasedetail` (
  `idPurchaseDetail` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `totalPrice` decimal(10,0) NOT NULL,
  `quantityProduct` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usercategory`
--

CREATE TABLE `usercategory` (
  `idUserCategory` int(11) NOT NULL,
  `userCategoryName` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='\n\n';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `userEmail` varchar(45) NOT NULL,
  `idUserCategory` int(11) NOT NULL,
  `userBirthDate` date NOT NULL,
  `userPassword` varchar(60) NOT NULL,
  `userImg` varchar(200) NOT NULL,
  `idCity` int(11) DEFAULT NULL,
  `userAddress` varchar(200) DEFAULT NULL,
  `userFloor` varchar(50) DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  `modifiedAt` datetime DEFAULT NULL,
  `softDelete` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`idCity`);

--
-- Indices de la tabla `itempurchase`
--
ALTER TABLE `itempurchase`
  ADD PRIMARY KEY (`idItemPurchase`),
  ADD KEY `idProduct` (`idProduct`),
  ADD KEY `itempurchase_ibfk_2` (`idPurchaseDetail`);

--
-- Indices de la tabla `productcategory`
--
ALTER TABLE `productcategory`
  ADD PRIMARY KEY (`idProductCategory`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`idProduct`),
  ADD KEY `productCategory` (`idProductCategory`);

--
-- Indices de la tabla `purchasedetail`
--
ALTER TABLE `purchasedetail`
  ADD PRIMARY KEY (`idPurchaseDetail`),
  ADD KEY `idUser` (`idUser`);

--
-- Indices de la tabla `usercategory`
--
ALTER TABLE `usercategory`
  ADD PRIMARY KEY (`idUserCategory`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `userEmail` (`userEmail`),
  ADD UNIQUE KEY `userPassword` (`userPassword`),
  ADD KEY `zipCode` (`idCity`),
  ADD KEY `userCategory` (`idUserCategory`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `itempurchase`
--
ALTER TABLE `itempurchase`
  MODIFY `idItemPurchase` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productcategory`
--
ALTER TABLE `productcategory`
  MODIFY `idProductCategory` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `idProduct` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `purchasedetail`
--
ALTER TABLE `purchasedetail`
  MODIFY `idPurchaseDetail` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `itempurchase`
--
ALTER TABLE `itempurchase`
  ADD CONSTRAINT `itempurchase_ibfk_2` FOREIGN KEY (`idPurchaseDetail`) REFERENCES `purchasedetail` (`idPurchaseDetail`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `itempurchase_ibfk_3` FOREIGN KEY (`idProduct`) REFERENCES `products` (`idProduct`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`idProductCategory`) REFERENCES `productcategory` (`idProductCategory`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `purchasedetail`
--
ALTER TABLE `purchasedetail`
  ADD CONSTRAINT `purchaseDetail_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `users` (`userId`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`idCity`) REFERENCES `cities` (`idCity`),
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`idUserCategory`) REFERENCES `usercategory` (`idUserCategory`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
