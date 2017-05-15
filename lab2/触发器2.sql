create trigger trg2
on dbo.phonePaid
for insert 
as 
begin 
	declare @num char(12),@date date,@total float,@prebalance float;
	select @num=pnumber,@date=pdate,@total=paid from inserted
	if(not exists(
	select *
	from phoneFeeHistory
	where phoneFeeHistory.pnumber=@num))
	select @prebalance=0;
	else begin
		select @prebalance=( select pbalance from phoneFeeHistory  where pnumber=@num and pmonth = (
		select MAX(pmonth) from  phoneFeeHistory  where pnumber = @num
		) )
	end  
	insert into phoneFeeHistory
	values(@num, @date, @total, 1, @prebalance+@total)
end