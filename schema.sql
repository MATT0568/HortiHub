#create database hortihub_db;

SET GLOBAL log_bin_trust_function_creators = 1;

use hortihub_db;

  -- ----------------------------------------------------------------------------
-- Routine hortihub_db.add_user
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `hortihub_db`$$
CREATE PROCEDURE `add_user`(IN p_email   VARCHAR(4000),
                      IN p_password   VARCHAR(4000),
                      p_first_name VARCHAR(4000),
                      p_last_name VARCHAR(4000))
BEGIN
	INSERT INTO APP_USER (
      email,
      `PASSWORD`,
      first_name,
      last_name
    )
    VALUES (
      UPPER(p_email),
      get_hash(p_email, p_password),
      p_first_name,
      p_last_name
    );
END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine hortihub_db.change_password
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `hortihub_db`$$
CREATE PROCEDURE `change_password`(IN p_email VARCHAR(4000),
                             IN p_old_password VARCHAR(4000),
                             IN p_new_password VARCHAR(4000))
BEGIN
    DECLARE v_USER_ID CHAR(10);
   
    DECLARE EXIT HANDLER FOR NOT FOUND BEGIN
		SIGNAL SQLSTATE 'XAE07' SET MESSAGE_TEXT = 'Invalid email/PASSWORD.';
    END;
    
    SELECT USER_ID
    INTO   v_USER_ID
    FROM   APP_USER
    WHERE  EMAIL = UPPER(p_email)
    AND    `PASSWORD` = get_hash(p_email, p_old_password)
    FOR UPDATE;
    
    UPDATE APP_USER
    SET    `PASSWORD` = get_hash(p_email, p_new_password)
    WHERE  USER_ID    = v_USER_ID;
    
    COMMIT;
   END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine hortihub_db.get_hash
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `hortihub_db`$$
CREATE FUNCTION `get_hash`(p_email VARCHAR(4000), p_password VARCHAR(4000)) RETURNS varchar(4000) CHARSET latin1
    DETERMINISTIC
BEGIN
	DECLARE l_salt VARCHAR(30) DEFAULT 'SaltPasswordText';
	RETURN MD5(concat(UPPER(p_email), l_salt,UPPER(p_password)));
END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine hortihub_db.valid_user
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `hortihub_db`$$
CREATE FUNCTION `valid_user`(p_email VARCHAR(4000), p_password VARCHAR(4000)) RETURNS varchar(1) CHARSET latin1
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN
      RETURN '0';
    END;
    
    CALL valid_user(p_email, p_password);
    RETURN '1';
END$$

DELIMITER ;
DELIMITER $$
CREATE PROCEDURE `valid_user`(IN p_email   VARCHAR(4000),
                        IN p_password   VARCHAR(4000))
BEGIN
    DECLARE v_dummy VARCHAR(1);
   
    DECLARE EXIT HANDLER FOR NOT FOUND BEGIN
		SIGNAL SQLSTATE 'XAE07' SET MESSAGE_TEXT = 'Invalid email/PASSWORD.';
    END;
    
    SELECT '1'
    INTO   v_dummy
    FROM   APP_USER
    WHERE  EMAIL = UPPER(p_email)
    AND    `PASSWORD` = get_hash(p_email, p_password);
 END$$
DELIMITER ;
SET FOREIGN_KEY_CHECKS = 1;

CALL add_user('mateo0568@gmail.com', 'puggles1', 'Matthew', 'Lesniewicz');