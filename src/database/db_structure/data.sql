-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-08-2022 a las 20:04:38
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

--
-- Volcado de datos para la tabla `cities`
--

INSERT INTO `cities` (`idCity`, `cityName`, `shippingCost`) VALUES
(1619, 'Garin', '501.20'),
(1629, 'Pilar', '443.26'),
(1828, 'Banfield', '443.26'),
(1885, 'Guillermo E Hudson', '474.52'),
(2421, 'Campo Beiro', '510.99'),
(3300, 'Posadas', '270.32'),
(3308, 'Villa Venecia', '298.52'),
(3350, 'Monte Hermoso', '319.47'),
(5212, 'Juan Garcia', '562.42'),
(6031, 'El Dorado', '296.27'),
(7114, 'Castelli', '406.87'),
(8370, 'San Martin De Los Andes', '634.79');

--
-- Volcado de datos para la tabla `productcategory`
--

INSERT INTO `productcategory` (`idProductCategory`, `productCategoryName`) VALUES
(2, 'Tintos'),
(3, 'Blancos'),
(4, 'Especiales'),
(5, 'Espumantes');

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`idProduct`, `productName`, `idProductCategory`, `productHarvest`, `productVariety`, `productBreeding`, `productGuard`, `productDescription`, `productImg`, `productPrice`, `productStock`, `createAt`, `modifiedAt`, `softDelete`) VALUES
(1, 'Colección Terra Rossa Malbec', 2, 2019, '100% Malbec', '12 meses en roble francés', '6 años', 'Rojo granate intenso y concentrado, con destellos violáceos. La impetuosa nariz típica de la variedad regala además armonías florales (violeta) y notas de frutos rojos y negros frescos (cereza, cassis). En boca, los taninos se encuentran bien presentes, destacándose el cacao amargo y frutas maceradas. Intenso y complejo, es dueño de una muy lograda acidez', 'malbec.png', '5460', 100, NULL, NULL, NULL),
(2, 'Colección Terra Rossa Merlot', 2, 2017, '100% Merlot', '12 meses en roble francés', '15 años', 'Rubí intenso y brillante. Los acentos de fruta negra (moras) irrumpen en la nariz, junto a otros matices aromáticos (humo, cuero) y al elegante marco vainillado que lo hace tan seductor. En el paladar, los clásicos resabios al “pastel de frutas” (ciruela pasa) forman parte de una entrada suculenta y sabrosa, bien equilibrada con taninos firmes, aunque suaves. Un tinto expresivo bien definido por su lograda tipicidad varietal', 'merlot.png', '5570', 90, NULL, NULL, NULL),
(3, 'Colección Terra Rossa Pinot Noir', 2, 2018, '100% Pinot Noir', '12 meses el 20% del corte en roble francés', '8 años', 'Púrpura de media intensidad, con matices rojos. Aromas sutiles a frutas rojas frescas (cereza, frutilla, arándanos) unidos a otros más complejos que evocan el bosque, ahumados, cuero y tabaco. En el paladar, deja una sensación aterciopelada, en la que perdura el recuerdo de frutas secas (avellana)', 'pinot-noir.png', '4017', 100, NULL, NULL, NULL),
(4, 'Colección Terra Rossa Cabernet Sauvignon', 2, 2017, '100% Cabernet Sauvignon', '14 meses el 20% del corte en roble francés', '10 años', 'Rojo rubí brillante. En nariz muy aromático donde resaltan notas a fruta negra y el típico pimiento verde, propio de la variedad. Vigoroso en boca descubre sabores frutados y especiados, finalizando en un postgusto intenso y agradable', 'cabernet.png', '5365', 85, NULL, NULL, NULL),
(5, 'Colección Terra Rossa Syrah', 2, 2019, '100% Syrah', '12 meses el 20% del corte en roble francés', '8 años', 'Rojo intenso, con matices azulados. En nariz, se presentan los aromas frutados como la ciruela y los frutos rojos maduros combinados con el anís y la vainilla. En boca se resaltan las notas especiadas. Los taninos, muy presentes pero amables, destacan su personalidad', 'syrah.png', '4976', 100, NULL, NULL, NULL),
(6, 'Colección Terra Rossa Tempranillo', 2, 2019, '100% Tempranillo', '12 meses el 30% del corte en roble francés', '5 años', 'Rojo rubí intenso y brillante. Una amplia y fresca paleta aromática domina la nariz (flores, fruta roja, frutos negros maduros). Hay evocación a especias (vainilla) en los sabrosos taninos que aseguran un final de boca atractivo y suculento', 'tempranillo.png', '3206', 100, NULL, NULL, NULL),
(7, 'Missioni Gran Chardonnay', 3, 2017, '90% Chardonnay, 10% Pinot Grigio', '12 meses en roble francés', '10 años', 'De color dorado intenso con reflejos verdosos. En nariz, ofrece aromas a frutas tropicales acompañadas con notas de vainilla y miel, aportadas por el tiempo de crianza en barrica. En boca, se confirma la paleta aromática de este vino untuoso, complejo y de persistente final.', 'chardonnay.png', '7884', 100, NULL, NULL, NULL),
(8, 'Origen Pinot Grigio', 3, 2020, '100% Pinot Grigio', '6 meses el 10% del corte en roble francés', '3 años', 'Amarillo cristalino, con matices verdosos y dorados. Sus aromas remiten a frutas blancas y citrus, con un fino toque de anís. Fresco y untuoso, su óptima acidez descubre un final de boca franco, de muy buena persistencia', 'grigio.png', '2720', 100, NULL, NULL, NULL),
(9, 'Origen Viognier', 3, 2020, '100% Viognier', '6 meses el 10% del corte en roble francés', '3 años', 'Amarillo verdoso, con reflejos dorados. Las notas florales sobresalen y aparecen amalgamadas junto a frescas frutas de carozo (durazno, damasco) y leves notas tropicales que recuerdan al ananá. En boca, es de gran untuosidad, envolvente y con un final perfumado y persistente', 'viognier.png', '2612', 100, NULL, NULL, NULL),
(10, 'Casa Rossa Blend', 3, 2017, '50% Chardonnay de Gualtallary, 20 años, 30% Chardonnay de Altamira, 11 años, 20% Riesling de Gualtallary', '12 meses el 30% del corte en roble francés', '8 a 10 años', 'Es un vino de color amarillo dorado con brillantes reflejos verdosos. En nariz se perciben los aromas exuberantes a melón fresco y durazno blanco, combinados con notas de frutas tropicales, compañía perfecta para las notas cítricas y florales. Su entrada dulce es equilibrada debido a su crianza en roble. Es un vino muy armonioso, elegante y cremoso con gran amplitud en boca, impacta con un toque dulce y una acidez refrescante', 'blend.png', '4499', 90, NULL, NULL, NULL),
(11, 'Reserve Rosé Malbec', 4, 2021, '100% Malbec', 'El 10% fue fermentado en barrica 2 meses de trabajo sobre lías', '10 años', 'De color dorado intenso con reflejos verdosos. En nariz, ofrece aromas a frutas tropicales acompañadas con notas de vainilla y miel, aportadas por el tiempo de crianza en barrica. En boca, se confirma la paleta aromática de este vino untuoso, complejo y de persistente final', 'rose-malbec.png', '6700', 60, NULL, NULL, NULL),
(12, 'Ocho Riesling', 4, 2021, '100% Riesling', '4 meses el 10% del corte en roble francés', '7 años', 'Amarillo brillante con tonalidades verdosas sutiles. En nariz revela aromas cítricos y de manzana verde; notas de miel y azahares aparecen al final. En boca la entrada es seca, fresca y aromática. Presenta sabores en consonancia con los aromas percibidos en nariz sumando una fina nota de tilo. La acidez lograda nos hace esperar una longevidad interesante. El final es largo y persistente pero a la vez refrescante', 'riesling.png', '9840', 50, NULL, NULL, NULL),
(13, 'Terra Rossa Vin Doux Naturel', 4, 2018, 'Semillón y Verdicchio', '15 meses el 50% en roble francés', '10 años', 'Amarillo dorado límpido, brillante. Este vino -naturalmente dulce- se obtiene a partir de la sobremaduración de las uvas (cosecha tardía), unida a la acción del hongo Botrytis cinerea. Esta cepa afecta el racimo, deshidratando al extremo cada grano y permitiendo -en simultáneo- el máximo incremento del nivel de azúcar de las uvas. El resultado es un vino de aroma singular (flores, manzana verde, membrillos horneados, miel de abeja), dueño de una complejidad excepcional', 'vin-doux-naturel.png', '8624', 100, NULL, NULL, NULL),
(14, 'Terra Rossa Brut Nature', 5, 2019, '30% Pinot Noir, 40% Chardonnay, 30% Semillón', '9 meses el 30% en roble francés', '4 años', 'Dorado ámbar suave y brillante, con reflejos verdosos. Finas y permanentes burbujas aparecen en la copa, mientras se desprenden notas aromáticas de elegante complejidad en las que sobresale la del pan recién horneado. En boca fresco y equilibrado, refleja un balance bien logrado entre acidez y mínimo tenor de azúcar que nos deja un agradable final', 'brut-nature.png', '11984', 100, NULL, NULL, NULL),
(15, 'Terra Rossa Extra Brut', 5, 2018, '75% Chardonnay, 25% Pinot Noir de Tupungato', '18 meses sobre lías', '1 año', 'Dorado ámbar suave y brillante. Burbujas pequeñas y persistentes. Su delicada paleta aromática la forman dejos a fruta blanca y pan tostado. Fresco, atractivo y con buen volumen en boca', 'extra-brut.png', '15422', 70, NULL, NULL, NULL),
(16, 'Reliquias Rosé de Malbec', 4, 2021, '100% Malbec de Gualtallary', 'El 10% de este vino fue fermentado en barrica por 2 meses con trabajo sobre lías', '3 años', 'Un sutil perfil avainillado enmarca las notas a frutas rojas frescas (cereza, frutilla y grosella) cómo también encontramos elegantes notas florales que lo hacen distinto al resto. Fácil de beber, es amable y sofisticado. Fresco y suave en boca', 'reliquias-rose.png', '6220', 100, NULL, NULL, NULL),
(17, 'Reliquias Encabezado de Malbec (dulce)', 4, 2015, '100% Malbec de Gualtallary', '18 meses en barricas de roble francés', '20 años', 'Rubí muy profundo, con matices violáceos y púrpura. Una compleja combinación de aromas gana la nariz: frutas rojas y negras frescas (frutillas, cassis, mora, arándanos), cacao amargo, torrefactos (café), junto al perfume propio del aguardiente utilizado. En la boca, se reiteran los precursores descriptos y también aparecen sabores frutales con­tados (higos). Los taninos se mantienen fi­rmes y medianamente sucrosos. Este vino fue añejado en barricas nuevas de roble francés por 18 meses y podrá continuar su crianza en botella por más de dos décadas', 'reliquias-malbec-dulce.png', '4216', 100, NULL, NULL, NULL),
(18, 'Reliquias Doux', 4, 2020, '85% Gewürztraminer, 15% Riesling de Valle de Uco', '15 meses el 50% del corte en Roble Francés', '3 años', 'Amarillo dorado límpido, brillante. Este vino -naturalmente dulce- se obtiene a partir de la sobremaduración de las uvas (cosecha tardía), unida a la acción del hongo Botrytis cinerea. Esta cepa afecta el racimo, deshidratando al extremo cada grano y permitiendo -en simultáneo- el máximo incremento del nivel de azúcar de las uvas. El resultado es un vino de aroma singular (flores, manzana verde, membrillos horneados, miel de abeja), dueño de una complejidad excepcional', 'reliquias-doux.png', '3415', 100, NULL, NULL, NULL),
(19, 'Reserve Pinot Noir', 2, 2019, '100% Pinot Noir de Valle de Uco', '12 meses el 30% del corte en roble francés', '5 años', 'Intenso y profundo color rubí. En nariz encontramos delicadas notas florales que nos recuerdan a violetas, y frutas rojas frescas como frambuesas. En la boca, estos aromas se vuelven finamente complejos, con acentos ahumados y un dejo mineral en su largo y persistente final    ', 'reserva-pinot-noir.png', '8171', 100, NULL, '2022-08-17 17:17:27', NULL),
(20, 'sdas sdadasdasdasdsdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasd', 4, 3, 'asdasd', 'asdasd', 'asdasdas', 'sdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasd', 'sdas sdadasdasdasdsdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasdsdasdasdasd-1660759036255.png', '6', 7, '2022-08-17 17:57:16', '2022-08-17 17:57:16', '2022-08-17 17:57:59');

--
-- Volcado de datos para la tabla `usercategory`
--

INSERT INTO `usercategory` (`idUserCategory`, `userCategoryName`) VALUES
(1, 'admin'),
(2, 'user');

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `userEmail`, `idUserCategory`, `userBirthDate`, `userPassword`, `userImg`, `idCity`, `userAddress`, `userFloor`, `createAt`, `modifiedAt`, `softDelete`) VALUES
(2, 'admin', 'DH', 'admin@admin.com', 1, '2012-06-09', '$2a$10$HKNeaOXSig7hvG5zywrDOuIzumJIoK5PoQB/WWFZfQlty6/ERQ1GK', 'admin@admin.com_1657413736084.png', 1828, NULL, NULL, NULL, NULL, NULL),
(3, 'Johanna', 'Chamorro', 'asdemail@email.com', 1, '2000-12-14', '$2a$10$8UXITBJbGaQ6f5CsJq7iPe3mTYTKfzA.1FCZeP/4qSIbgY05QyF8K', 'asdemail@email.com_1657764290979.jpg', 1885, NULL, NULL, NULL, NULL, NULL),
(4, 'Leandro', 'Ojeda', 'leandro@correo.com', 1, '1995-09-17', '$2a$10$prJ4ZUhTh1MQQQiPQixuvuSamFK5nnyn48u3bwq5yev4wfWotdOiq', 'leandro@correo.com_1658374278426.jpg', 8370, NULL, NULL, NULL, NULL, NULL),
(5, 'Matias', 'Gonzalez', 'mng_epson@hotmail.com', 1, '2000-11-11', '$2a$10$qPt7P2NiWy3nprcYmuzN3OOspnYfBfN81r541YCWWBQ9SQN/0OHhe', 'mng_epson@hotmail.com_1658379721365.png', 3300, NULL, NULL, NULL, NULL, NULL),
(6, 'Amalia', 'Ribeiro', 'amalia@grupo4.com', 1, '2000-11-11', '$2a$10$MG/hGrCNngGrUie8r7P/GuC3hVGoncXzUV7Yq4hC4n.RZQWIkTgUu', 'amalia@grupo4.com_1658451055057.png', 3300, NULL, NULL, NULL, NULL, NULL),
(7, 'Araceli', 'Vizcaino', 'araceli@email.com', 2, '1999-07-19', '$2a$10$jd3dEDa/CC2o5GLnRWELV.PNYCVXn7yVne6pa27KUfTO5Ym7ct.9S', 'araceli@email.com_1659380461343.png', 1619, NULL, NULL, NULL, NULL, NULL),
(8, 'Jesica', 'Moreira', 'jesica@email.com', 2, '1994-07-21', '$2a$10$qIhR37moM5UAHPFGIsAyqux65JZ3XEz4qv8nWiY2UG/JXb/IgubYW', 'jesica@email.com_1659380297358.jpg', 2421, NULL, NULL, NULL, NULL, NULL),
(9, 'Esteban', 'Campoy', 'esteban@email.com', 2, '1997-02-27', '$2a$10$4tdzL9hG0bN2.G.5LN1W0O5XuLQA3sO.9T02G29QJXNWuoIORP//e', 'esteban@email.com_1659381042015.jpg', 3350, NULL, NULL, NULL, NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
