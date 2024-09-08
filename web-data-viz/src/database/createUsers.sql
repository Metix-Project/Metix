-- drop user 'metixAdm'@'%';
create user if not exists 'metixAdm'@'%' identified by 'sptech';
grant all privileges on Metix.* to 'metixAdm'@'%';

-- drop user 'metixUser'@'%';
create user if not exists 'metixUser'@'%' identified by 'sptech';
grant insert, select on Metix.* to 'metixUser'@'%';

-- drop user 'metixUserInsert'@'%';
create user if not exists 'metixUserInsert'@'%' identified by 'sptech';
grant insert on Metix.* to 'metixUserInsert'@'%';

-- drop user 'metixUserSelect'@'%';
create user if not exists 'metixUserSelect'@'%' identified by 'sptech';
grant select on Metix.* to 'metixUserSelect'@'%';
