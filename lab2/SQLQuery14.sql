create trigger trg1
on dbo.phoneMFee
for insert 
as 
begin 
	declare @num char(12),@date date,@total float,@prebalance float;
	select @num=pnumber,@date=mdate,@total=mtotal from inserted
	if(not exists(
	select *
	from phoneFeeHistory
	where phoneFeeHistory.pnumber=@num))
	@prebalance=0;
	else begin
		select @prebalance=( select pbalance from phoneFeeHistory  where pmonth = (
		select MAX(pmonth) from  phoneFeeHistory  where pnumber = @num;
		) )
	end  
	insert into
end