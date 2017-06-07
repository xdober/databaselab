var db = openDatabase('testDB', '1.0', 'Test DB', 32 * 1024 * 1024),
  tmp, losttmp, overtmp, emp=[], slyRow=[], lostm=[], overm=[];
for(var i=0; i<3; i++){
  emp[i]="emp"+i;
  document.getElementById(emp[i]).onclick=function(){operation(this.id)};
}
function operation(oper) {
  switch (oper) {
    case "emp0": viewsalary(); break;
    case "emp1": viewreward(); break;
    case "emp2": goback(); break;
    default: ;
  }
}
function createSalaryRow(no,name,month,bisc,lmoy,omoy) {
  var oTemp = new Object
  oTemp.Eno  = no
  oTemp.Ename = name
  oTemp.Smonth = month
  oTemp.Basic = bisc
  oTemp.Lmoney = lmoy
  oTemp.Omoney = omoy
  oTemp.Fmoney = bisc+omoy-lmoy
  return oTemp;
}
function updatesalary(){
  var Enum
  db.transaction(function(tx){
    tx.executeSql('select Eno, Ename, Bsalary from Branch,Employee where Branch.Bname=Employee.Bno',[],
    function(tx,results){
      tmp=results
      Enum=tmp.rows.length//获取到员工数量
      for(var i=0;i<Enum;i++){//对每个员工
        var tmpeno=tmp.rows.item(i).Eno,
            tmpename=tmp.rows.item(i).Ename,
            tmpsalary=tmp.rows.item(i).Bsalary
        lostm[i]=[],overm[i]=[]
        slyRow[i]=[]
        for(var mo=1;mo<13;mo++){
          lostm[i][mo]=0
          overm[i][mo]=0
        }
        db.transaction(function(tx){//获取某员工的缺勤信息
          tx.executeSql('select Lmonth,Lmoney from Lost where Eno=?',[tmpeno],
          function(tx,results){
            losttmp=results
            for(var mo=0;mo<losttmp.rows.length;mo++){
              lostm[i][losttmp.rows.item(mo).Lmonth]=losttmp.rows.item(mo).Lmoney
            }
            db.transaction(function(tx){//获取某员工的津贴信息
              tx.executeSql('select Omonth,Omoney from Overtime where Eno=?',[tmpeno],
              function(tx,results){
                overtmp=results
                for(var mo=0;mo<overtmp.rows.length;mo++){
                  overm[i][overtmp.rows.item(mo).Omonth]=overtmp.rows.item(mo).Omoney
                }
                sqlAdd(i,1)
                // for(var j=1;j<13;j++){//1到12月份
                //   slyRow[j]=createSalaryRow(tmpeno,tmpename,j,tmpsalary,lostm[j],overm[j])
                //   db.transaction(function(tx){//插入工资表
                //     tx.executeSql('insert into Salary values(?,?,?,?,?,?,?)',
                //       [slyRow[j].Eno,slyRow[j].Ename,slyRow[j].Smonth,slyRow[j].Basic,slyRow[j].Lmoney,slyRow[j].Omoney,slyRow[j].Fmoney],
                //       function(tx,results){
                //         lostm[j]=0
                //         overm[j]=0
                //       },
                //       function(tx,errmeg){
                //
                //       })
                //   })
                // }
              },
              function(tx,errmeg){

              })
            })
          },
          function(tx,errmeg){

          })
        })
      }
    },
    function(tx,errmeg){

    })
  })
}
function sqlint(i,j){//1到12月份
  slyRow[i][j]=createSalaryRow(tmpeno,tmpename,j,tmpsalary,lostm[j],overm[j])
  db.transaction(function(tx){//插入工资表
    tx.executeSql('insert into Salary values(?,?,?,?,?,?,?)',
      [slyRow[j].Eno,slyRow[j].Ename,slyRow[j].Smonth,slyRow[j].Basic,slyRow[j].Lmoney,slyRow[j].Omoney,slyRow[j].Fmoney],
      function(tx,results){
        lostm[j]=0
        overm[j]=0
        j=j+1
        if (j<13) {
          sqlint(j)
        } else {
          return
        }
      },
      function(tx,errmeg){

      })
  })
}
function viewsalary(){
  updatesalary()
}
function goback(){
  window.location="admin.html"
}
