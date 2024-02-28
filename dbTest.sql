-- Active: 1707101283311@@127.0.0.1@3306@sesac
show tables;

-- Users
drop table if EXISTS users; -- users 테이블이 이미 존재할 경우 삭제
CREATE TABLE users (
    users_id INT PRIMARY KEY AUTO_INCREMENT,
    users_email VARCHAR(100) NOT NULL,
    users_password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    nickname VARCHAR(20)
);
desc users;
insert into users VALUES (null,"test@naver.com","1234",default,"jarajiri");
SELECT * from users;
-- 더미 데이터 삽입 프로시저
DROP procedure IF EXISTS `random_insert`;
CREATE PROCEDURE random_insert(IN num_rows INT)
BEGIN
    DECLARE i INT DEFAULT 1;
    
    WHILE i <= num_rows DO
        INSERT INTO users (users_email, users_password, created_at, nickname)
        VALUES (CONCAT('user', i, '@example.com'), (CONCAT('password', i)), CURRENT_DATE, CONCAT('User', i));
        
        SET i = i + 1;
    END WHILE;
    
END;
-- 프로시저 실행
CALL random_insert(100);

-- Jobs
drop table if EXISTS jobs; -- users 테이블이 이미 존재할 경우 삭제
CREATE TABLE jobs (
    jobs_id INT PRIMARY KEY AUTO_INCREMENT,
    users_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATE,
    img_path VARCHAR(255) DEFAULT '/uploads/default.png',
    company_name VARCHAR(100), NOT NULL,
    levels ENUM(1,2,3) NOT NULL,
    introduce TEXT,
    task text,
    condition VARCHAR(255),
    prefer VARCHAR(255),
    stack ENUM('JAVA','NODE','VUE','REACT'),
    welfaer VARCHAR(255),
    
    

);
desc users;
insert into users VALUES (null,"test@naver.com","1234",default,"jarajiri");
SELECT * from users;
-- 더미 데이터 삽입 프로시저
DROP procedure IF EXISTS `random_insert`;
CREATE PROCEDURE random_insert(IN num_rows INT)
BEGIN
    DECLARE i INT DEFAULT 1;
    
    WHILE i <= num_rows DO
        INSERT INTO users (users_email, users_password, created_at, nickname)
        VALUES (CONCAT('user', i, '@example.com'), (CONCAT('password', i)), CURRENT_DATE, CONCAT('User', i));
        
        SET i = i + 1;
    END WHILE;
    
END;
-- 프로시저 실행
CALL random_insert(100);