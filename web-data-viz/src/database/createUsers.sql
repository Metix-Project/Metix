drop user if exists 'metixAdm'@'%';
create user 'metixAdm'@'%' identified by 'sptech';
grant all privileges on Metix.* to 'metixAdm'@'%';

drop user if exists 'metixUser'@'%';
create user 'metixUser'@'%' identified by 'sptech';
grant insert, select on Metix.* to 'metixUser'@'%';

drop user if exists 'metixUserInsert'@'%';
create user 'metixUserInsert'@'%' identified by 'sptech';
grant insert on Metix.* to 'metixUserInsert'@'%';

drop user if exists 'metixUserSelect'@'%';
create user 'metixUserSelect'@'%' identified by 'sptech';
grant select on Metix.* to 'metixUserSelect'@'%';
