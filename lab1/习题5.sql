use DBU201414803;
go

select SNAME,CITY
from SPJ414803.S;

select PNAME,COLOR,WEIGHT
from SPJ414803.P;

select JNO
from SPJ414803.SPJ
where SNO='S1';

select PNAME,QTY
from SPJ414803.SPJ,SPJ414803.P
where SPJ.PNO=p.PNO;

select PNO
from SPJ414803.SPJ,SPJ414803.S
where SPJ.SNO=s.SNO and CITY='上海';

select JNAME
from SPJ414803.SPJ,SPJ414803.S,SPJ414803.J
where SPJ.SNO=s.SNO and S.CITY='上海' and SPJ.JNO=j.JNO;

select JNO
from SPJ414803.J
where not exists 
	((SELECT * FROM SPJ414803.S WHERE CITY='天津' AND EXISTS 
       (SELECT * FROM SPJ414803.SPJ WHERE SNO=S.SNO AND  JNO=J.JNO)));

update SPJ414803.P
set COLOR='蓝'
where COLOR='红';

UPDATE SPJ414803.SPJ  
SET SNO='S3'
WHERE JNO='J4' AND SNO='S5' AND PNO='P6';

delete 
from SPJ414803.SPJ
where SNO='S2';
delete
from SPJ414803.S
where SNO='S2';

insert into SPJ414803.SPJ
values('S2','J6','P4',200);