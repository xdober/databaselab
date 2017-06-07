var db = openDatabase('testDB', '1.0', 'Test DB', 32 * 1024 * 1024), tmp;
var emp=[]
for(var i=0;i<5;i++){
  var aim="area"+i;
  document.getElementById(aim).style.visibility="hidden"
}

$('button').addClass("btn btn-success")
var place=["工号","姓名","性别","年龄","工种","电话","地址"]
var Bnames=[], input=[]
for(var i=0; i<5; i++){
  emp[i]="emp"+i;
  document.getElementById(emp[i]).onclick=function(){operation(this.id)};
}
function operation(oper) {
  switch (oper) {
    case "emp0": showInfo(); break;
    case "emp1": getAllBname(); break;
    case "emp2": delOper(); break;
    case "emp3": getAllBname2(); break;
    case "emp4": goback(); break;
    default: ;
  }
}
function goback(){
  window.location="admin.html"
}
function showInfo(){
  document.getElementById("area0").style.visibility="visible"
  db.transaction(function(tx){
    tx.executeSql('select * from Employee',[],
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
  if (tmp.rows.length==0) {
    //空
  } else {
    var eno,ename,esex,eage,eaddr,etel,bno,len=tmp.rows.length,i
    for(i=0;i<len;i++){
      eno=$('<div class = "col-xs-1 new"></div>').text(tmp.rows.item(i).Eno)
      ename=$('<div class = "col-xs-2 new"></div>').text(tmp.rows.item(i).Ename)
      eage=$('<div class = "col-xs-1 new"></div>').text(tmp.rows.item(i).Eage)
      bno=$('<div class = "col-xs-2 new"></div>').text(tmp.rows.item(i).Bno)
      esex=$('<div class = "col-xs-1 new"></div>').text(tmp.rows.item(i).Esex)
      etel=$('<div class = "col-xs-2 new"></div>').text(tmp.rows.item(i).Etel)
      eaddr=$('<div class = "col-xs-2 new"></div>').text(tmp.rows.item(i).Eaddr)
      var clrflt = $('<div class = "clear-float"></div>')
      var newli = $('<li class = "new list-group-item"></li>').append(eno,ename,eage,bno,esex,etel,eaddr,clrflt)
      $("#area1").append(newli)
    }
    document.getElementById("area1").style.visibility='visible'
    document.getElementById("emp0").onclick=function(){hide("li",".new","emp0","显示全部员工信息","area0")
      document.getElementById("emp0").onclick=function(){showInfo()};
    }
  }
  document.getElementById("emp0").innerHTML="隐藏全部员工信息";
}
function hide(item, cls, iid, text, idd){//要移除的标签名，要移除的类名，按钮ID，替换文本，要隐藏的区域ID
   $(item).remove(cls);
  document.getElementById(iid).innerHTML=text;
  document.getElementById(idd).style.visibility='hidden'
}
function addOper(){
  document.getElementById("addtitle").style.visibility='visible'
  document.getElementById("area3").style.visibility='visible'
  addtextarea(7, "area3", "newadd")
  $("#add2").remove()
  $("#add4").remove()
  var set=$("<select id='add4' class='newadd'></select>")
  var sex=$("<select id='add2' class='newadd'><option>男</option><option>女</option></select>")
  $("#area3").append(set)
  $("#area3").append(sex)
  $("#add2").addClass("selectpicker")
  $("#add4").addClass("selectpicker")
  for(var i=0;i<Bnames.length;i++){
    var opt=$("<option></option>").text(Bnames[i])
    $("#add4").append(opt)
  }

  var sub = $("<button class='newadd' id='execadd'></button>").text("提交")
  $("#area3").append(sub)

  document.getElementById("emp1").onclick=function(){hide("input",".newadd","emp1","添加员工","addtitle")
    hide("select",".newadd","emp1","添加员工","area3")
    hide("button",".newadd","emp1","添加员工","area3")
    document.getElementById("emp1").onclick=function(){getAllBname()};
  }
  document.getElementById("emp1").innerHTML="完成添加";
  document.getElementById("execadd").onclick=function(){sqlAdd()}
}
function sqlAdd(){
  var i, addvalue=[], Id
  for(i=0;i<7;i++){
    Id="add"+i
    addvalue[i]=document.getElementById(Id).value
    if (addvalue[i]=="") {
      alert("请输入完整信息")
      return
    }
  }
  db.transaction(function(tx){
    tx.executeSql('insert into Employee values(?,?,?,?,?,?,?)',[addvalue[0],addvalue[1],addvalue[2],addvalue[3],addvalue[4],addvalue[5],addvalue[6]],
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
  $("#area3").children("input").addClass(clsname)
 }
function getAllBname(){
  db.transaction(function(tx){
    tx.executeSql('select Bname from Branch',[],
    function(tx,results){
      tmp=results
      var len=tmp.rows.length
      for(var i=0; i<len; i++){
        Bnames[i]=tmp.rows.item(i).Bname
      }
      addOper()
    },
    function(tx,errmeg){
      tmp=errmeg
      alert(tmp.message)
    })
  })
}
function delOper(){
document.getElementById("deltitle").style.visibility='visible'
document.getElementById("area2").style.visibility='visible'
  var input = $('<input class="newdel" id="delvalue"></input>'),
    exec=$('<input type=button id="execdelete" value="删除"  class="newdel"></input');
  $("#area2").append(input);
  $("#area2").append(exec);
  document.getElementById("emp2").onclick=function(){hide("input",".newdel", "emp2", "删除员工","deltitle");
  document.getElementById("emp2").onclick=function(){delOper()};
  }
  document.getElementById("emp2").innerHTML="完成删除";
  document.getElementById("execdelete").onclick=function(){sqlDelete()}
}
function sqlDelete(){//执行删除语句
  var Eno=document.getElementById("delvalue").value;
  if (Eno=="") {
    alert("请输入员工编号！")
  } else {
    db.transaction(function (tx) {
       tx.executeSql('delete from Employee where Eno=?',[Eno],
       function (tx, results) {
         tmp=results;
         if(tmp.rowsAffected==0){
           alert("表中没有该员工！")
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
function upOper(){
  document.getElementById("uptitle").style.visibility='visible'
  document.getElementById("area4").style.visibility='visible'
  var i,exec=$('<input id="execupdate" type=button value="更新"  class="newup"></input');
  for(i=0;i<7;i++){
    switch (i) {
      case 0: input[i]=$('<input id="up0" placeholder="工号" class="newup"></input>'); break;
      case 1: input[i]=$('<input id="up1" placeholder="姓名" class="newup"></input>'); break;
      case 2: input[i]=$('<select id="up2" placeholder="性别" class="newup"><option>男</option><option>女</option></select>'); break;
      case 3: input[i]=$('<input id="up3" placeholder="年龄" class="newup"></input>'); break;
      case 4: input[i]=$('<select id="up4" placeholder="工种" class="newup"></select>'); break;
      case 5: input[i]=$('<input id="up5" placeholder="电话" class="newup"></input>'); break;
      case 6: input[i]=$('<input id="up6" placeholder="住址" class="newup"></input>'); break;
      default:;
    }
  }
  for(var i=0;i<7;i++){
    $("#area4").append(input[i]);
  }
  for(var i=0;i<Bnames.length;i++){
    var bnam=$("<option></option>").text(Bnames[i])
    $("#up4").append(bnam)
  }
  $("#area4").append(exec);
  document.getElementById("emp3").onclick=function(){hide("input",".newup", "emp3", "修改员工信息","uptitle");
  hide("select",".newup", "emp3", "修改员工信息","uptitle")
  document.getElementById("emp3").onclick=function(){upOper()};
  }
  document.getElementById("emp3").innerHTML="完成更新";
  document.getElementById("execupdate").onclick=function(){sqlUpdate()}
}
function getAllBname2(){
  db.transaction(function(tx){
    tx.executeSql('select Bname from Branch',[],
    function(tx,results){
      tmp=results
      var len=tmp.rows.length
      for(var i=0; i<len; i++){
        Bnames[i]=tmp.rows.item(i).Bname
      }
      upOper()
    },
    function(tx,errmeg){
      tmp=errmeg
      alert(tmp.message)
    })
  })
}
function sqlUpdate(){//执行update操作
  var i, upvalue=[], Id
  for(i=0;i<7;i++){
    Id="up"+i
    upvalue[i]=document.getElementById(Id).value
  }
  if (upvalue[0]=="") {
    alert("工号为必填项！")
    return
  }
  db.transaction(function (tx) {
     tx.executeSql('select * from Employee where Eno=?',[upvalue[0]],
     function (tx, results) {
       tmp=results;
       if(tmp.rows.length==0){
         alert("没有该员工！")
         return
       } else {
         var oldvalue=[]
         oldvalue[1]=tmp.rows.item(0).Ename
         oldvalue[2]=tmp.rows.item(0).Esex
         oldvalue[3]=tmp.rows.item(0).Eage
         oldvalue[4]=tmp.rows.item(0).Bno
         oldvalue[5]=tmp.rows.item(0).Etel
         oldvalue[6]=tmp.rows.item(0).Eaddr
         for (var i = 1; i < 7; i++) {
           if (upvalue[i]=="") {
             upvalue[i]=oldvalue[i]
           }
         }
       }
     },
     function (tx, errmeg) {
       tmp=errmeg;
       alert(tmp.message);
     });
  });
  db.transaction(function (tx) {
     tx.executeSql('update Employee set Ename=?, Esex=?, Eage=?, Bno=?, Etel=?, Eaddr=? where Eno=?',[upvalue[1],upvalue[2],upvalue[3],upvalue[4],upvalue[5],upvalue[6],upvalue[0]],
     function (tx, results) {
       tmp=results;
       if(tmp.rowsAffected==0){
         alert("更新失败！")
       } else {
         alert("已更新！");
       }
     },
     function (tx, errmeg) {
       tmp=errmeg;
       alert(tmp.message);
     });
  });
}
