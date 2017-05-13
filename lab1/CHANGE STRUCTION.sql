USE DBU201414803;
go
alter table SPJ414803.P add Price float;
alter table SPJ414803.J add Pstart date not null;
alter table SPJ414803.J add Pend date;
