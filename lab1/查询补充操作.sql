use DBU201414803;
go
--一年内完工的项目
select SPJ.JNO,DATEDIFF(DAY,Pstart,Pend)
from SPJ414803.SPJ,SPJ414803.J
where SPJ.JNO=j.JNO and DATEDIFF(DAY,Pstart,Pend)<365;
--查出工程所用零件都是由异地供应商供应的工程号
select JNO
from SPJ414803.J jx
where CITY not in
	(select S.CITY
	 from SPJ414803.SPJ,SPJ414803.S,SPJ414803.J jy
	 where SPJ.JNO=jy.JNO and SPJ.SNO=S.SNO and SPJ.JNO=jx.JNO)
--求每个供应商2016年的零件销售额
select SUM(QTY*Price)
from SPJ414803.SPJ,SPJ414803.P
where SPJ.PNO=P.PNO
group by SNO

