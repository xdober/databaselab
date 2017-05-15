--revert
execute as user='oper1'
--查询手机销售信息
select *
from SaleRecord

--手机用户档案信息
select *
from cellUser

--个人手机话费信息；
select x.pnumber, username, pbalance
from cellUser, phoneFeeHistory x
where cellUser.pnumber=x.pnumber and x.pmonth=(
select MAX(pmonth) from phoneFeeHistory y where x.pnumber=y.pnumber)

--根据手机号码查询用户信息
select *
from cellUser
where pnumber='xxxx'

--每种机型的销售情况
SELECT [Ptype]
      ,COUNT(*) num
  FROM [MCPI].[dbo].[SaleRecord]
  group by Ptype
GO

--欠费用户查询；
select x.pnumber, username, pbalance
from cellUser, phoneFeeHistory x
where cellUser.pnumber=x.pnumber and x.pmonth=(
select MAX(pmonth) from phoneFeeHistory y where x.pnumber=y.pnumber) and pbalance<0