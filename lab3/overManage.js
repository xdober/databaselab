var db = openDatabase('testDB', '1.0', 'Test DB', 32 * 1024 * 1024), tmp, emp=[];
for(var i=0; i<5; i++){
  emp[i]="emp"+i;
  document.getElementById(emp[i]).onclick=function(){operation(this.id)};
}

$('button').addClass("btn btn-success")
var Enos=[],Enames=[],Omons=[],place=["工号","月份","加班类型","加班天数"]
function operation(oper) {
  switch (oper) {
    case "emp0": showInfo(); break;
    case "emp1": getAllEno(); break;
    case "emp2": delOper(); break;
    case "emp3": getAllEnoOmons(); break;
    case "emp4": goback(); break;
    default: ;
  }
}
function getAllEnoOmons(){
  db.transaction(function(tx){
    tx.executeSql('select Eno, Omonth from Overtime',[],
    function(tx,results){
      tmp=results
      var len=tmp.rows.length
      for(var i=0; i<len; i++){
        Enos[i]=tmp.rows.item(i).Eno
        Omons[i]=tmp.rows.item(i).Omonth
      }
      upOper()
    },
    function(tx,errmeg){
      tmp=errmeg
      alert(tmp.message)
    })
  })
}
function upOper(){
  var inputsup = $('<div class="newup" id="newup"></div>'),
    uptip=$("<h5></h5>").text("请选择要更新的工号和月份，并输入正确的加班类型和天数")
  $("body").append(inputsup)
  var enoomon=$('<select id="enovse"></select>')
  var inputtype=$('<input id="uptype" placeholder="加班类型"></input>')
  var inputnum=$('<input id="upnum" placeholder="加班天数"></input>')
  var execup=$("<button id='subup'></button>").text("提交")
  $("#newup").append(uptip).append(enoomon).append(inputtype).append(inputnum).append(execup)
  for(var i=0;i<tmp.rows.length;i++){
    var list=$('<option></option>').text(Enos[i]+"号 at "+Omons[i]+"月")
    $('#enovse').append(list)
  }
  document.getElementById('subup').onclick=function(){sqlUpdate()}
  hide(".newup","emp3","修改记录","修改完成")
}
function sqlUpdate(){
  var emstr=document.getElementById("enovse").value,
    onum=document.getElementById("upnum").value,
    otype=document.getElementById("uptype").value
  var emvalues=emstr.split("号 at ")
  var tttp=emvalues[1].split("月")
  emvalues[1]=tttp[0]
  if (onum==""&&otype=="") {
    alert("请至少输入一项要修改的信息！")
    return
  } else {
    var uupsql, args=[]
    if (onum=="") {
      uupsql='update Overtime set Otype=? where Eno=? and Omonth=?'
      args=[otype,emvalues[0],emvalues[1]]
    }else if (otype=="") {
      uupsql='update Overtime set Onum=?,Omoney=? where Eno=? and Omonth=?'
      args=[onum,onum*50,emvalues[0],emvalues[1]]
    } else {
      uupsql='update Overtime set Otype=?, Onum=?,Omoney=? where Eno=? and Omonth=?'
      args=[otype,onum,onum*50,emvalues[0],emvalues[1]]
    }
    db.transaction(function(tx){
      tx.executeSql(uupsql,args,
      function(tx,results){
        tmp=results
        if (tmp.rowsAffected==0) {
          alert("修改失败！")
        } else {
          alert("修改成功！")
        }
      },
      function(tx,errmeg){
        alert("tmp.message")
      })
    })
  }
}
function delOper(){
  var inputsdel = $('<div class="newdel" id="newdel"></div>'),
    deltip=$("<h5></h5>").text("请输入要删除的工号和月份")
  $("body").append(inputsdel)
  $("#newdel").append(deltip)
  var inputdel=$('<input placeholder="工号" class="newdel" id="delEno"></input><input placeholder="月份" class="newdel" id="delOmon"></input>')
  $("#newdel").append(inputdel)
  var execdel = $('<button id="subdel"></button>').text("提交")
  $("#newdel").append(execdel)
  document.getElementById('subdel').onclick=function(){sqlDelete()}
  hide(".newdel","emp2","删除记录","删除完成")
}
function sqlDelete(){
  var Eno=document.getElementById("delEno").value,
      Omon=document.getElementById('delOmon').value
  if (Eno==""||Omon=="") {
    alert("请输入完整信息！")
  } else {
    db.transaction(function (tx) {
       tx.executeSql('delete from Overtime where Eno=? and Omonth=?',[Eno,Omon],
       function (tx, results) {
         tmp=results;
         if(tmp.rowsAffected==0){
           alert("表中没有该记录！")
         } else {
           alert("已删除！");
         }
       },
       function (tx, errmeg) {
         tmp=errmeg;
         alert(errmeg);
       });
    });
  }
}
function getAllEno(){
  db.transaction(function(tx){
    tx.executeSql('select Eno,Ename from Employee',[],
    function(tx,results){
      tmp=results
      var len=tmp.rows.length
      for(var i=0; i<len; i++){
        Enames[i]=tmp.rows.item(i).Ename
        Enos[i]=tmp.rows.item(i).Eno
      }
      addOper()
    },
    function(tx,errmeg){
      tmp=errmeg
      alert(tmp.message)
    })
  })
}
function addOper(){
  var addtip=$("<h5></h5>").text("请输入要添加的记录信息")
  var inputsadd = $('<div class="newadd" id="newadd"></div>')
  $("body").append(inputsadd)
  addtextarea(4,"newadd","newadd")
  $("#add0").remove()
  var selt=$('<select id="add0"></select>')
  $("#newadd").prepend(selt)
  for(var i=0;i<Enames.length;i++){
    var opt=$('<option></option>').text(Enos[i]+": "+Enames[i])
    $("#add0").append(opt)
  }
  var execadd = $('<button id="sub"></button>').text("提交")
  $("#newadd").append(execadd)
  $("#newadd").prepend(addtip)
  document.getElementById('sub').onclick=function(){sqlAdd()}
  hide(".newadd","emp1","添加纪录","添加完成")
}
function sqlAdd(){
  var addvalue=[], Id
  for(var i=0;i<4;i++){
    Id="add"+i
    addvalue[i]=document.getElementById(Id).value
    if (addvalue[i]=="") {
      alert("请输入完整信息")
      return
    }
  }
  var noname=addvalue[0].split(": ")
  db.transaction(function(tx){
    tx.executeSql('insert into Overtime values(?,?,?,?,?)',[noname[0],addvalue[1],addvalue[2],addvalue[3],addvalue[3]*100],
    function(tx,results){
      tmp=results
      if(tmp.rowsAffected==0){
        alert("插入失败！")
      } else {
        alert("已插入！")
      }
    },
    function(tx,errmeg){
      tmp=errmeg
      alert(tmp.message)
    })
  })
}
function addtextarea(x, pid, clsname){//个数，父ID
  if(x==""){
    count=0;
  }else{
    count=x;
  }
  var inputs = document.getElementById(pid);
  for (var i=0;i<count;i++){
    var textin = document.createElement("input");
    textin.type="text";
    textin.name="name_"+i;
    textin.id="add"+i;//给这个input赋予id值
    textin.placeholder=place[i];
    inputs.appendChild(textin);
  }
}
function showInfo(){
  var showtitle=$('<h5 class="new"><div class="col-xs-2" id="Eno">工号</div>\
    <div class="col-xs-2" id="Omonth">月份</div>\
    <div class="col-xs-2" id="Otype">加班类型</div>\
    <div class="col-xs-2" id="Onum">加班天数</div>\
    <div class="col-xs-2" id="Omoney">应发津贴</div><br></h5>')
  $("body").append(showtitle)
  var showlist=$('<ul class="new list-group" id="listtitle"></ul>')
  $("body").append(showlist)
  db.transaction(function(tx){
    tx.executeSql('select * from Overtime',[],
    function(tx,results){
      tmp=results
      resultToLists()
    },
    function(tx,errmeg){
      tmp=errmeg
      alert(tmp.message)
    })
  })
}
function resultToLists(){
  var len=tmp.rows.length
  if (len==0) {
    //空
  } else {
    var eno, omonth, otype, onum, omoney
    for(i=0;i<len;i++){
      eno=$('<div class = "col-xs-2"></div>').text(tmp.rows.item(i).Eno)
      omonth=$('<div class = "col-xs-2"></div>').text(tmp.rows.item(i).Omonth)
      otype=$('<div class = "col-xs-2"></div>').text(tmp.rows.item(i).Otype)
      onum=$('<div class = "col-xs-2"></div>').text(tmp.rows.item(i).Onum)
      omoney=$('<div class = "col-xs-2"></div>').text(tmp.rows.item(i).Omoney)
      var clrflt=$('<div class="clear-float"></div>')
      newli=$('<li class="list-group-item"></li>').append(eno,omonth,otype,onum,omoney,clrflt)
      $("#listtitle").append(newli)
    }
  }
  hide(".new","emp0","显示津贴信息","隐藏津贴信息")

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
