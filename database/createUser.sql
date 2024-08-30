create user 'metixUserInsert'@'%' identified by 'sptech';
grant insert on Metix.* to 'metixUserInsert'@'%';

create user 'metixUser'@'%' identified by 'sptech';
grant insert, select on Metix.* to 'metixUserInsert'@'%';
