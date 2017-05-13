use DBU201414803;
go

create view 三建 as
	select SPJ.PNO,SPJ.SNO,QTY
	from SPJ414803.SPJ,SPJ414803.J
	where JNAME='三建' and SPJ.JNO=J.JNO