USE DBU201414803;
Go
CREATE TABLE SPJ414803.S
	(SNO CHAR(3) primary key,
	SNAME CHAR(7) not null,
	STATUS INT,
	CITY CHAR(5));
create table SPJ414803.P
	(PNO CHAR(3) primary key,
	PNAME char(7) not null,
	COLOR char(3),
	WEIGHT int default (10));
create table SPJ414803.J
	(JNO char(3) primary key,
	JNAME char(9) not null,
	CITY char(5));
create table SPJ414803.SPJ
	(SNO char(3),
	PNO char(3),
	JNO char(3),
	QTY int check (QTY>=1 and QTY <=10000),
	primary key (SNO,PNO,JNO),
	foreign key (SNO) references SPJ414803.S(SNO),
	foreign key (PNO) references SPJ414803.P(PNO),
	foreign key (JNO) references SPJ414803.J(JNO));