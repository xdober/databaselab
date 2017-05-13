use DBU201414803;
go
alter table SPJ414803.J add constraint chk1 check (Pend>Pstart);