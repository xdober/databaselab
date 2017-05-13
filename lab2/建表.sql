use MCPI;
go
create table BHall(
	Hno char(6) primary key,
	Haddr char(20),
	Hmanager char(6)
);
create table SaleRecord(
	Sno char(6) primary key,
	Ptype char(6),
	Sdate date,
	Salesman char(6),
	Hno char(6),
	foreign key (Hno) references BHall(Hno)
);
create table cellphone(
	Ptype char(6),
	Pdate date,
	primary key(Ptype, Pdate),
	Pprice float,
);
create table cellUser(
	pnumber char(12) primary key,
	username char(10) not null,
	uid char(20) not null,
	email char(24) check(email like '%@%.%')
);
create table phoneMFee(
	pnumber char(12),
	mdate date,
	primary key(pnumber, mdate),
	mfee1 float,
	mfee2 float,
	mfee3 float,
	mtotal as mfee1+mfee2+mfee3,
	foreign key (pnumber) references cellUser(pnumber)
);
create table phonePaid(
	pnumber char(12),
	pdate date,
	primary key(pnumber, pdate),
	foreign key (pnumber) references cellUser(pnumber),
	paid float
);
create table phoneFeeHistory(
	pnumber char(12),
	pmonth date,
	primary key(pnumber, pmonth),
	foreign key (pnumber) references cellUser(pnumber),
	fee float,
	CType int check(CType=1 or CType=0),
	pbalance float
);
