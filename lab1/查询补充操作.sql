use DBU201414803;
go
--һ�����깤����Ŀ
select SPJ.JNO,DATEDIFF(DAY,Pstart,Pend)
from SPJ414803.SPJ,SPJ414803.J
where SPJ.JNO=j.JNO and DATEDIFF(DAY,Pstart,Pend)<365;
--����������������������ع�Ӧ�̹�Ӧ�Ĺ��̺�
select JNO
from SPJ414803.J jx
where CITY not in
	(select S.CITY
	 from SPJ414803.SPJ,SPJ414803.S,SPJ414803.J jy
	 where SPJ.JNO=jy.JNO and SPJ.SNO=S.SNO and SPJ.JNO=jx.JNO)
--��ÿ����Ӧ��2016���������۶�
select SUM(QTY*Price)
from SPJ414803.SPJ,SPJ414803.P
where SPJ.PNO=P.PNO
group by SNO

