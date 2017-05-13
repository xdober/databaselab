grant all privileges 
on object::BHall 
to rolem
with grant option
grant all privileges 
on object::cellphone 
to rolem
with grant option
grant all privileges 
on object::phoneFeeHistory
to rolem
with grant option
grant all privileges 
on object::phoneMFee
to rolem
with grant option
grant all privileges 
on object::phonePaid
to rolem
with grant option
grant all privileges 
on object::SaleRecord
to rolem
with grant option

grant insert,delete,select,update
on object::BHall
to role1
grant insert,delete,select,update
on object::cellphone
to role1
grant insert,delete,select,update
on object::SaleRecord
to role1

grant insert,select
on object::cellUser
to role2
grant insert,select
on object::phoneMFee
to role2
grant insert,select
on object::phonePaid
to role2
grant select
on object::phoneFeeHistory
to role2
grant update(Haddr,Hmanager)
on object::BHall
to role2
grant update(Ptype,Sdate,Salesman,Hno)
on object::SaleRecord
to role2
grant update(Pprice)
on object::cellphone
to role2

grant select
on object::cellphone
to roleu
grant select
on object::cellUser
to roleu
grant select
on object::phoneMFee
to roleu
grant select
on object::phonePaid
to roleu
grant select
on object::phoneFeeHistory
to roleu