use DBU201414803;
go

create view ���� as
	select SPJ.PNO,SPJ.SNO,QTY
	from SPJ414803.SPJ,SPJ414803.J
	where JNAME='����' and SPJ.JNO=J.JNO