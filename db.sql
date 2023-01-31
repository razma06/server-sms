CREATE DATABASE smshistory;

// write this crate table query for postgresql
-- CREATE TABLE sms (
--   id int(11) NOT NULL AUTO_INCREMENT,
--   sender varchar(20) NOT NULL,
--   receiver varchar(20) NOT NULL,
--   message varchar(160) NOT NULL,
--   date datetime NOT NULL,
--   PRIMARY KEY (id)
-- );

CREATE TABLE sms (
  id SERIAL PRIMARY KEY,
  sender varchar(20) NOT NULL,
  receiver varchar(20) NOT NULL,
  message varchar(160) NOT NULL,
  date timestamp NOT NULL
);


