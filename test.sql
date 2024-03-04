
-- Active: 1707101713117@@127.0.0.1@3306@sesac

-- 더미 데이터 삽입을 위한 MYSQL 프로시저
-- 프로시저 삭제
DROP PROCEDURE IF EXISTS insert_dummy_data;
-- 프로시저 생성
CREATE PROCEDURE insert_dummy_data()
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE max_rows INT DEFAULT 10; -- 각 테이블에 삽입할 더미 데이터의 최대 행 수
    
    -- users 테이블에 더미 데이터 삽입
    WHILE i <= max_rows DO
        INSERT INTO users (users_email, users_password, nickname)
        VALUES (CONCAT('user', i, '@example.com'), 'password123', CONCAT('User', i));
        SET i = i + 1;
    END WHILE;
    
    -- jobs 테이블에 더미 데이터 삽입
    SET i = 1;
    WHILE i <= max_rows DO
        INSERT INTO jobs (
            users_id, 
            company_name, 
            levels, 
            introduce, 
            task, 
            conditions, 
            prefer, 
            stack, 
            deadline, 
            address, 
            source)
        VALUES (
            i, 
            CONCAT('Company', i), 
            FLOOR(RAND() * 3) + 1, 
            CONCAT('Introduce for company ', i), 
            CONCAT('Task for company ', i), 
            'Conditions', 
            'Prefer', 
            -- 기술 스택 랜덤 case 문
            CASE ROUND(RAND() * 5)
                WHEN 0 THEN 'JAVA'
                WHEN 1 THEN 'NODE'
                WHEN 2 THEN 'VUE'
                WHEN 3 THEN 'REACT'
                WHEN 4 THEN 'JS'
                ELSE 'SPRING'
            END,
            DATE_ADD(NOW(), INTERVAL i DAY), 
            CONCAT('Address ', i), 'Source');
        SET i = i + 1;
    END WHILE;
    
    -- reviews 테이블에 더미 데이터 삽입
    SET i = 1;
    WHILE i <= max_rows DO
        INSERT INTO reviews (jobs_id, users_id, reviews_comment)
        VALUES (i, i, CONCAT('Review for job ', i));
        SET i = i + 1;
    END WHILE;
    
    -- user_likes 테이블에 더미 데이터 삽입
    SET i = 1;
    WHILE i <= max_rows DO
        INSERT INTO user_likes (users_id, jobs_id)
        VALUES (i, i);
        SET i = i + 1;
    END WHILE;
    
END;
-- 프로 시저 실행
call insert_dummy_data();

