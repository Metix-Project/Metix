drop user if exists 'metixUserInsert'@'%';
create user 'metixUserInsert'@'%' identified by 'sptech';
grant insert on Metix.* to 'metixUserInsert'@'%';

drop user if exists 'metixUser'@'%';
create user 'metixUser'@'%' identified by 'sptech';
grant insert, select on Metix.* to 'metixUser'@'%';
