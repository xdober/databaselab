execute as user='oper1'
insert into cellUser
	values('15122223333','陈小兵','382325677895346782','ifxnbk@gmail.com'),
	('15144334433','李欣博','382326735895346782','lixbbo@live.com'),
	('15144222233','王世明','382326711111346782','whuimk@live.com'),
	('15144111333','陈秋鹤','382387657895346782','ifqqhe@gmail.com'),
	('15267367933','能世木','309785835895346782','nguimu@live.com')

insert into phonePaid
	values('15122223333','2017-01-01',100)
insert into phonePaid
	values('15144222233','2017-02-01',100)

insert into phoneMFee(pnumber,mdate,mfee1,mfee2,mfee3)
	values('15122223333','2017-02-02',10,10,10);
insert into phoneMFee(pnumber,mdate,mfee1,mfee2,mfee3)
	values('15122223333','2017-03-02',11,12,13)

insert into phoneMFee(pnumber,mdate,mfee1,mfee2,mfee3)
	values('15144222233','2017-03-02',40,40,40);