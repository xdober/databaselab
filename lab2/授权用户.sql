grant all privileges 
on object::BHall 
to manager
with grant option
grant all privileges 
on object::cellphone 
to manager
with grant option
grant all privileges 
on object::phoneFeeHistory
to manager
with grant option
grant all privileges 
on object::phoneMFee
to manager
with grant option
grant all privileges 
on object::phonePaid
to manager
with grant option
grant all privileges 
on object::SaleRecord
to manager
with grant option

grant insert,delete,select,update
on object::BHall
to oper1
grant insert,delete,select,update
on object::cellphone
to oper1
grant insert,delete,select,update
on object::celluser
to oper1
grant insert,delete,select,update
on object::phoneMFee
to oper1
grant insert,delete,select,update
on object::phonePaid
to oper1
grant insert,delete,select,update
on object::SaleRecord
to oper1
grant select
on object::phoneFeeHistory
to oper1

grant select
on object::cellphone
to user1
grant select
on object::cellUser
to user1
grant select
on object::phoneMFee
to user1
grant select
on object::phonePaid
to user1
grant select
on object::phoneFeeHistory
to user1