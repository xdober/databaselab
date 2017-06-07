create trigger addemplee after insert
on Employee
begin
	insert into Salary values(new.Eno,new.Ename,1,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Salary values(new.Eno,new.Ename,2,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Salary values(new.Eno,new.Ename,3,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Salary values(new.Eno,new.Ename,4,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Salary values(new.Eno,new.Ename,5,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Salary values(new.Eno,new.Ename,6,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Salary values(new.Eno,new.Ename,7,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Salary values(new.Eno,new.Ename,8,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Salary values(new.Eno,new.Ename,9,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Salary values(new.Eno,new.Ename,10,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Salary values(new.Eno,new.Ename,11,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Salary values(new.Eno,new.Ename,12,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Reward values(new.Eno,(select Bsalary from Branch where Bname=new.Bno));
end

create trigger deleteemployee after delete
on Employee
begin
	delete from Salary where Eno=old.Eno;
	delete from Lost where Eno=old.Eno;
	delete from Overtime where Eno=old.Eno;
  delete from Reward where Eno=old.Eno;
end

create trigger updateemployee after update
on Employee
begin
  update Salary set Ename=new.Ename, Bsalary=(select Bsalary from Branch where Bname=new.Bno), where Eno=new.Eno;
end

create trigger addLost after insert
on Lost
begin
	update Salary set Lmoney=new.Lmoney, Tmoney=(select Tmoney from Salary where Eno=new.Eno and Smonth=new.Lmonth)-new.Lmoney where Eno=new.Eno and Smonth=new.Lmonth;
	update Reward set Reward=(select Reward from Reward where Eno=new.Eno)-new.Lmoney/12 where Eno=new.Eno;
end

create trigger delLost after delete
on Lost
begin
	update Salary set Lmoney=0, Tmoney=(select Tmoney from Salary where Eno=old.Eno and Smonth=old.Lmonth)+old.Lmoney where Eno=old.Eno and Smonth=old.Lmonth;
	update Reward set Reward=(select Reward from Reward where Eno=old.Eno)+old.Lmoney/12 where Eno=old.Eno;
end

create trigger updateLost after update
on Lost
begin
	update Salary set Lmoney=new.Lmoney, Tmoney=(select Tmoney from Salary where Eno=new.Eno and Smonth=new.Lmonth)+old.Lmoney-new.Lmonth where Eno=old.Eno and Smonth=old.Lmonth;
	update Reward set Reward=(select Reward from Reward where Eno=old.Eno)+old.Lmoney/12-new.Lmoney/12 where Eno=old.Eno;
end

create trigger addOver after insert
on Overtime
begin
	update Salary set Omoney=new.Omoney, Tmoney=(select Tmoney from Salary where Eno=new.Eno and Smonth=new.Omonth)+new.Omoney where Eno=new.Eno and Smonth=new.Omonth;
	update Reward set Reward=(select Reward from Reward where Eno=new.Eno)+new.Omoney/12 where Eno=new.Eno;
end

create trigger delOver after delete
on Overtime
begin
	update Salary set Omoney=0, Tmoney=(select Tmoney from Salary where Eno=old.Eno and Smonth=old.Omonth)-old.Omoney where Eno=old.Eno and Smonth=old.Omonth;
	update Reward set Reward=(select Reward from Reward where Eno=old.Eno)-old.Omoney/12 where Eno=old.Eno;
end

create trigger updateOver after update
on Overtime
begin
	update Salary set Omoney=new.Omoney, Tmoney=(select Tmoney from Salary where Eno=new.Eno and Smonth=new.Omonth)-old.Omoney+new.Omonth where Eno=old.Eno and Smonth=old.Omonth;
	update Reward set Reward=(select Reward from Reward where Eno=old.Eno)-old.Omoney/12+new.Omoney/12 where Eno=old.Eno;
end

---------------------------------------分割线-------------------------------------
create trigger addEmployee after insert
on Employee
begin
	insert into Salary values(new.Eno,new.Ename,1,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Salary values(new.Eno,new.Ename,2,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Salary values(new.Eno,new.Ename,3,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Salary values(new.Eno,new.Ename,4,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Salary values(new.Eno,new.Ename,5,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Salary values(new.Eno,new.Ename,6,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Salary values(new.Eno,new.Ename,7,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Salary values(new.Eno,new.Ename,8,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Salary values(new.Eno,new.Ename,9,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Salary values(new.Eno,new.Ename,10,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Salary values(new.Eno,new.Ename,11,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Salary values(new.Eno,new.Ename,12,(select Bsalary from Branch where Bname=new.Bno),0,0,(select Bsalary from Branch where Bname=new.Bno));
	insert into Reward values(new.Eno,(select Bsalary from Branch where Bname=new.Bno));
end

create trigger deleteEmployee after delete
on Employee
begin
	delete from Lost where Eno=old.Eno;
	delete from Overtime where Eno=old.Eno;
	delete from Salary where Eno=old.Eno;
  delete from Reward where Eno=old.Eno;
end

create trigger updateemployee after update
on Employee
begin
  update Salary set Ename=new.Ename, Bsalary=(select Bsalary from Branch where Bname=new.Bno), where Eno=new.Eno;
end

create trigger addLost after insert
on Lost
begin
	update Salary set Lmoney=new.Lmoney, Tmoney=(select Tmoney from Salary where Eno=new.Eno and Smonth=new.Lmonth)-new.Lmoney where Eno=new.Eno and Smonth=new.Lmonth;
end

create trigger delLost after delete
on Lost
begin
	update Salary set Lmoney=0, Tmoney=(select Tmoney from Salary where Eno=old.Eno and Smonth=old.Lmonth)+old.Lmoney where Eno=old.Eno and Smonth=old.Lmonth;
end

create trigger updateLost after update
on Lost
begin
	update Salary set Lmoney=new.Lmoney, Tmoney=(select Tmoney from Salary where Eno=new.Eno and Smonth=new.Lmonth)+old.Lmoney-new.Lmonth where Eno=old.Eno and Smonth=old.Lmonth;
end

create trigger addOver after insert
on Overtime
begin
	update Salary set Omoney=new.Omoney, Tmoney=(select Tmoney from Salary where Eno=new.Eno and Smonth=new.Omonth)+new.Omoney where Eno=new.Eno and Smonth=new.Omonth;
end

create trigger delOver after delete
on Overtime
begin
	update Salary set Omoney=0, Tmoney=(select Tmoney from Salary where Eno=old.Eno and Smonth=old.Omonth)-old.Omoney where Eno=old.Eno and Smonth=old.Omonth;
end

create trigger updateOver after update
on Overtime
begin
	update Salary set Omoney=new.Omoney, Tmoney=(select Tmoney from Salary where Eno=new.Eno and Smonth=new.Omonth)-old.Omoney+new.Omonth where Eno=old.Eno and Smonth=old.Omonth;
end

create trigger updateSalaryB after update
on Salary when old.Tmoney!=new.Tmoney
begin
	update Reward set Reward=(select avg(Tmoney) from Salary where Eno=old.Eno) where Eno=new.Eno;
end

create trigger updateBranch after update
on Branch when old.Bsalary!=new.Bsalary
begin
	update Salary set Bsalary=new.Bsalary where Eno in (select Eno from Employee where Bno= (select Bname from Branch where Bno=new.Bno) );
end

create trigger updateSalaryT after update
on Salary when old.Bsalary!=new.Bsalary
begin
	update Salary set Tmoney=(select Tmoney from Salary where Eno=old.Eno and Smonth=old.Smonth)-old.Bsalary+new.Bsalary;
end

create trigger delBranch after delete
on Branch
begin
	delete from Employee where Bno=old.Bname;
end

insert into Lost values('002',2,3,150)
