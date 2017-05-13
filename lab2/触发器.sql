create trigger trg1
on dbo.phoneMFee
after insert 
as 
--insert into phoneFeeHistory(pnumber,pmonth,fee,CType,pbalance)
--select inserted.pnumber,inserted.mdate,inserted.mtotal,0,0 from inserted
begin
declare @num char(12),@date date,@total float,@prebalance
select @num=pnumber from inserted
select @date=mdate from inserted
select @total=mtotal from inserted
select @prebalance=pbalance from phoneFeeHistory,instered
	where inserted.pnumber=phoneFeeHistory.pnumber and phoneFeeHistory.mdate=MAX(mdate)
insert into phoneFeeHistory(pnumber,pmonth,fee,CType,pbalance)
values(@num,@date,@total,0,@balance-@total)
end 