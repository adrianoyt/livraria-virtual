-- MySQL Script generated by MySQL Workbench
-- Wed Sep  4 02:56:22 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema clig
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema clig
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `clig` DEFAULT CHARACTER SET utf8mb4 ;
USE `clig` ;

-- -----------------------------------------------------
-- Table `clig`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clig`.`categoria` (
  `idcategoria` INT NOT NULL AUTO_INCREMENT,
  `nm_categoria` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idcategoria`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `clig`.`livro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clig`.`livro` (
  `idlivro` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(100) NOT NULL,
  `autor` VARCHAR(45) NOT NULL,
  `editora` VARCHAR(45) NOT NULL,
  `edicao` VARCHAR(45) NOT NULL,
  `pags` INT NOT NULL,
  `sinopse` LONGTEXT NULL,
  `idioma` VARCHAR(45) NOT NULL,
  `categoria_idcategoria` INT NOT NULL,
  PRIMARY KEY (`idlivro`),
  INDEX `fk_livro_categoria_idx` (`categoria_idcategoria` ASC),
  CONSTRAINT `fk_livro_categoria`
    FOREIGN KEY (`categoria_idcategoria`)
    REFERENCES `clig`.`categoria` (`idcategoria`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

USE `clig` ;

-- -----------------------------------------------------
-- Placeholder table for view `clig`.`list_categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clig`.`list_categoria` (`nm_categoria` INT);

-- -----------------------------------------------------
-- Placeholder table for view `clig`.`list_livro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clig`.`list_livro` (`idlivro` INT, `titulo` INT, `autor` INT, `editora` INT, `edicao` INT, `pags` INT, `sinopse` INT, `idioma` INT, `nm_categoria` INT);

-- -----------------------------------------------------
-- procedure new_categoria
-- -----------------------------------------------------

DELIMITER $$
USE `clig`$$
CREATE PROCEDURE `new_categoria`(IN nm_categoria_c varchar(50))
begin
    insert categoria (nm_categoria) value (nm_categoria_c);
end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure new_livro
-- -----------------------------------------------------

DELIMITER $$
USE `clig`$$
CREATE PROCEDURE `new_livro`(IN titulo_l varchar(100), IN autor_l varchar(45), IN editora_l varchar(45), IN edicao_l varchar(45), IN pags_l int,IN sinopse_l longtext,IN idioma_l varchar(45),IN categoria_l varchar(45))
begin
	declare id_categoria int;
        
    select idcategoria into id_categoria from categoria where nm_categoria = categoria_l;
    
    insert livro (titulo, autor,editora,edicao,pags,sinopse,idioma,categoria_idcategoria) value (titulo_l, autor_l, editora_l,edicao_l,pags_l,sinopse_l, idioma_l,id_categoria);
    
end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure atualiza_livro
-- -----------------------------------------------------

DELIMITER $$
USE `clig`$$
CREATE PROCEDURE `atualiza_livro`(IN idlivro_l int, IN titulo_l varchar(100), IN autor_l varchar(45), IN editora_l varchar(45), IN edicao_l varchar(45), IN pags_l int, IN sinopse_l longtext, IN idioma_l varchar(45), IN categoria_l varchar(45))
begin
	declare id_categoria int;

    select idcategoria into id_categoria from categoria where nm_categoria = categoria_l;
    
	update livro set titulo = titulo_l, autor = autor_l, editora = editora_l ,edicao = edicao_l, pags = pags_l, sinopse = sinopse_l,idioma = idioma_l,categoria_idcategoria = id_categoria where idlivro = idlivro_l;
end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure remove_livro
-- -----------------------------------------------------

DELIMITER $$
USE `clig`$$
CREATE PROCEDURE `remove_livro`(IN idlivro_l int)
begin
    delete from livro where idlivro = idlivro_l;
end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure remove_categoria
-- -----------------------------------------------------

DELIMITER $$
USE `clig`$$
CREATE PROCEDURE `remove_categoria`(IN idcategoria_c int)
begin
	delete from categoria where idcategoria = idcategoria_c;
end$$

DELIMITER ;

-- -----------------------------------------------------
-- View `clig`.`list_categoria`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `clig`.`list_categoria`;
USE `clig`;
CREATE  OR REPLACE VIEW `list_categoria` AS select nm_categoria from categoria order by nm_categoria asc;

-- -----------------------------------------------------
-- View `clig`.`list_livro`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `clig`.`list_livro`;
USE `clig`;
CREATE  OR REPLACE VIEW `clig`.`list_livro` AS select `clig`.`livro`.`idlivro` AS `idlivro`,`clig`.`livro`.`titulo` AS `titulo`,`clig`.`livro`.`autor` AS `autor`,`clig`.`livro`.`editora` AS `editora`,`clig`.`livro`.`edicao` AS `edicao`,`clig`.`livro`.`pags` AS `pags`,`clig`.`livro`.`sinopse` AS `sinopse`,`clig`.`livro`.`idioma` AS `idioma`,`clig`.`categoria`.`nm_categoria` AS `nm_categoria` from (`clig`.`livro` join `clig`.`categoria` on((`clig`.`categoria`.`idcategoria` = `clig`.`livro`.`categoria_idcategoria`)));

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;