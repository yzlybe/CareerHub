-- Active: 1707101713117@@127.0.0.1@3306@sesac
show tables;

-- users table
drop table if EXISTS users;
CREATE TABLE users (
    users_id INT PRIMARY KEY AUTO_INCREMENT,
    users_email VARCHAR(255) NOT NULL UNIQUE,
    users_password VARCHAR(255) NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP not null,
    nickname VARCHAR(255) NOT NULL
);
desc users;
SELECT * from users;

-- jobs table
drop table if EXISTS jobs; 
CREATE TABLE jobs (
    jobs_id INT PRIMARY KEY AUTO_INCREMENT,
    users_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME,
    img_path VARCHAR(255) DEFAULT '/uploads/default.png',
    company_name VARCHAR(255) NOT NULL,
    levels ENUM('1','2','3') NOT NULL,
    introduce MEDIUMTEXT,
    task MEDIUMTEXT,
    conditions VARCHAR(255),
    prefer VARCHAR(255),
    stack ENUM('JAVA','NODE','VUE','REACT','JS','SPRING'),
    welfare VARCHAR(255),
    deadline DATETIME NOT NULL,
    address VARCHAR(255) NOT NULL,
    address_detail VARCHAR(255),
    source VARCHAR(255) NOT NULL,
    others VARCHAR(255),
    cnt_likes INT NOT NULL DEFAULT 0,
    Foreign Key (users_id) REFERENCES users(users_id)
    on update CASCADE on delete CASCADE
);
desc jobs;
SELECT * from jobs;

-- reviews table
drop table if EXISTS reviews;
CREATE TABLE reviews (
    reviews_id INT PRIMARY KEY AUTO_INCREMENT,
    jobs_id INT ,
    users_id INT ,
    reviews_comment VARCHAR(200) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME,
    Foreign Key (jobs_id) REFERENCES jobs(jobs_id)
    on update CASCADE on delete CASCADE,
    Foreign Key (users_id) REFERENCES users(users_id)
    on update CASCADE on delete CASCADE
);
desc reviews;
select * from reviews;

-- user_likes
drop table if EXISTS user_likes;
CREATE TABLE user_likes (
    user_likes_id INT PRIMARY KEY AUTO_INCREMENT,
    users_id INT ,
    jobs_id INT ,
    Foreign Key (jobs_id) REFERENCES jobs(jobs_id)
    on update CASCADE on delete CASCADE,
    Foreign Key (users_id) REFERENCES users(users_id)
    on update CASCADE on delete CASCADE
);
desc user_likes;
select * from user_likes;


