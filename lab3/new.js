var db = openDatabase('testDB', '1.0', 'Test DB', 32 * 1024 * 1024),
  tmp, losttmp, overtmp, emp=[], slyRow=[], lostm=[], overm=[],
  empdex=0;
  var Enum, j=1
  var tmpeno,
      tmpename,
      tmpsalary


for(var i=0; i<3; i++){
  emp[i]="emp"+i;
  document.getElementById(emp[i]).onclick=function(){operation(this.id)};
}

$('button').addClass("btn btn-success")
function operation(oper) {
  switch (oper) {
    case "emp0": viewsalary(); break;
    case "emp1": viewreward(); break;
    case "emp2": goback(); break;
    default: ;
  }
}
function viewreward(){
  var showtitle=$('<h5 class="newr"><div class="col-xs-1" id="Eno">工号</div>\
    <div class="col-xs-1" id="Omonth">姓名</div>\
    <div class="col-xs-2" id="Omoney">年终奖</div><div class="clear-float"></div></h5>')
  $('body').append(showtitle)
  var showlist=$('<ul class="newr list-group" id="listtitler"></ul>')
  $("body").append(showlist)
  db.transaction(function(tx){
    tx.executeSql('select Reward.Eno,Ename,Reward from Employee, Reward where Employee.Eno=Reward.Eno',[],
    function(tx,results){
      tmp=results
      resultToListsR()
    },
    function(tx,errmeg){

    })
  })
}
function resultToListsR(){
  var len=tmp.rows.length
  if (len==0) {
    //空
  } else {
    var eno, ename, reaward
    for(i=0;i<len;i++){
      eno=$('<div class = "col-xs-1"></div>').text(tmp.rows.item(i).Eno)
      ename=$('<div class = "col-xs-1"></div>').text(tmp.rows.item(i).Ename)
      reaward=$('<div class = "col-xs-2"></div>').text(tmp.rows.item(i).Reward)
      var clrflt=$('<div class="clear-float"></div>')
      newli=$('<li class="list-group-item"></li>').append(eno, ename, reaward, clrflt)
      $("#listtitler").append(newli)
    }
  }
  hide(".newr","emp1","显示年终奖信息","隐藏年终奖信息")
}
function viewsalary(){
  var showtitle=$('<h5 class="new"><div class="col-xs-1" id="Eno">工号</div>\
    <div class="col-xs-1" id="Omonth">姓名</div>\
    <div class="col-xs-1" id="Otype">月份</div>\
    <div class="col-xs-2" id="Onum">基本工资</div>\
    <div class="col-xs-2" id="Omoney">扣除工资</div>\
    <div class="col-xs-2" id="Omoney">加班津贴</div>\
    <div class="col-xs-2" id="Omoney">总工资</div><br></h5>')

  $('body').append(showtitle)
  var showlist=$('<ul class="new list-group" id="listtitle"></ul>')
  $("body").append(showlist)
  db.transaction(function(tx){
    tx.executeSql('select * from Salary',[],
    function(tx,results){
      tmp=results
      resultToLists()
    },
    function(tx,errmeg){

    })
  })
}
function resultToLists(){
  var len=tmp.rows.length
  if (len==0) {
    //空
  } else {
    var eno, ename, smonth, bmoney, lmoney, omoney, tmoney
    for(i=0;i<len;i++){
      eno=$('<div class = "col-xs-1"></div>').text(tmp.rows.item(i).Eno)
      ename=$('<div class = "col-xs-1"></div>').text(tmp.rows.item(i).Ename)
      smonth=$('<div class = "col-xs-1"></div>').text(tmp.rows.item(i).Smonth)
      bmoney=$('<div class = "col-xs-2"></div>').text(tmp.rows.item(i).Bsalary)
      lmoney=$('<div class = "col-xs-2"></div>').text(tmp.rows.item(i).Lmoney)
      omoney=$('<div class = "col-xs-2"></div>').text(tmp.rows.item(i).Omoney)
      tmoney=$('<div class = "col-xs-2"></div>').text(tmp.rows.item(i).Tmoney)
      var clrflt=$('<div class="clear-float"></div>')
      newli=$('<li class="list-group-item"></li>').append(eno, ename, smonth, bmoney, lmoney, omoney, tmoney, clrflt)
      $("#listtitle").append(newli)
    }
  }
  hide(".new","emp0","显示工资信息","隐藏工资信息")
}
function hide(clsname,opid,distext,hidtext){
  document.getElementById(opid).innerHTML=hidtext
  document.getElementById(opid).onclick=function(){
    $(clsname).remove()
    document.getElementById(opid).innerHTML=distext
    document.getElementById(opid).onclick=function(){operation(opid)}
  }
}
function goback(){
  window.location="admin.html"
}
