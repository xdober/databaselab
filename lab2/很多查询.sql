--revert
execute as user='oper1'
--��ѯ�ֻ�������Ϣ
select *
from SaleRecord

--�ֻ��û�������Ϣ
select *
from cellUser

--�����ֻ�������Ϣ��
select x.pnumber, username, pbalance
from cellUser, phoneFeeHistory x
where cellUser.pnumber=x.pnumber and x.pmonth=(
select MAX(pmonth) from phoneFeeHistory y where x.pnumber=y.pnumber)

--�����ֻ������ѯ�û���Ϣ
select *
from cellUser
where pnumber='xxxx'

--ÿ�ֻ��͵��������
SELECT [Ptype]
      ,COUNT(*) num
  FROM [MCPI].[dbo].[SaleRecord]
  group by Ptype
GO

--Ƿ���û���ѯ��
select x.pnumber, username, pbalance
from cellUser, phoneFeeHistory x
where cellUser.pnumber=x.pnumber and x.pmonth=(
select MAX(pmonth) from phoneFeeHistory y where x.pnumber=y.pnumber) and pbalance<0