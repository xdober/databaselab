const loginState = sessionStorage.getItem('state');
$('.true-body').hide();
$('#success-alert').hide();
if (!loginState) {
  showAlert()
} else {
  $('.true-body').show();
  var db = openDatabase('testDB', '1.0', 'Test DB', 32 * 1024 * 1024), tmp, emp=[];
  var branchInfo, input=[], rows=[];
  for(var i=0; i<5; i++){
    emp[i]="emp"+i;
    document.getElementById(emp[i]).onclick=function(){operation(this.id)};
  }

  $('button').addClass("btn btn-success")
  var Bnos=[]
  function operation(oper) {
    switch (oper) {
      case "emp0": getInfo(); break;
      case "emp1": delOper(); break;
      case "emp2": addOper(); break;
      case "emp3": getAllBnos(); break;
      case "emp4": goback(); break;
      default: ;
    }
  }
}
function showAlert() {
    $('#success-alert').slideDown(500, function(){
      $('#success-alert').fadeTo(2500, 500).slideUp(500, function(){
        $('#success-alert').alert('close');
        window.location="index.html"
      });
    });

}
//更新操作
function getAllBnos(){
  db.transaction(function(tx){
    tx.executeSql('select * from Branch',[],
    function(tx,results){
      tmp=results
      var len=tmp.rows.length
      for(var i=0; i<len; i++){
        Bnos[i]=tmp.rows.item(i).Bno
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
    uptip=$("<h5></h5>").text("请选择要更新的工种编号，并输入正确的其他信息")
  $("body").append(inputsup)
//  $("#newup").append(uptip)
  var enoomon=$('<select id="up0"></select>')
  var inputname=$('<input id="up1" placeholder="工种名称"></input>')
  var inputlevel=$('<input id="up2" placeholder="工种等级"></input>')
  var inputsalary=$('<input id="up3" placeholder="基本工资"></input>')
//  $("#newup").append(inputnum)
  var execup=$("<button id='subup'></button>").text("提交")
  $("#newup").append(uptip).append(enoomon).append(inputname).append(inputlevel).append(inputsalary).append(execup)
  for(var i=0;i<tmp.rows.length;i++){
    var list=$('<option></option>').text(Bnos[i])
    $('#up0').append(list)
  }
  document.getElementById('subup').onclick=function(){sqlUpdate()}
  hide(".newup","emp3","修改记录","修改完成")
}
// function sqlUpdate(){
//   var emstr=document.getElementById("enovse").value,
//     oname=document.getElementById("upname").value,
//     olevel=document.getElementById("uplevel").value,
//     osalary=document.getElementById("upsalary").value
//   if (oname==""&&olevel==""&&osalary="") {
//     alert("请至少输入一项要修改的信息！")
//     return
//   } else {
//     var uupsql, args=[]
//     if (onum=="") {
//       uupsql='update Overtime set Otype=? where Eno=? and Omonth=?'
//       args=[otype,emvalues[0],emvalues[1]]
//     }else if (otype=="") {
//       uupsql='update Overtime set Onum=?,Omoney=? where Eno=? and Omonth=?'
//       args=[onum,onum*50,emvalues[0],emvalues[1]]
//     } else {
//       uupsql='update Overtime set Otype=?, Onum=?,Omoney=? where Eno=? and Omonth=?'
//       args=[otype,onum,onum*50,emvalues[0],emvalues[1]]
//     }
//     db.transaction(function(tx){
//       tx.executeSql(uupsql,args,
//       function(tx,results){
//         tmp=results
//         if (tmp.rowsAffected==0) {
//           alert("修改失败！")
//         } else {
//           alert("修改成功！")
//         }
//       },
//       function(tx,errmeg){
//         alert("tmp.message")
//       })
//     })
//   }
// }
// function upOper(){
//   var i,exec=$('<input id="execupdate" type=button value="更新"  class="newup"></input');
//   for(i=0;i<4;i++){
//     switch (i) {
//       case 0: input[i]=$('<input id="up0" placeholder="工种编号" class="newup"></input>'); break;
//       case 1: input[i]=$('<input id="up1" placeholder="工种名称" class="newup"></input>'); break;
//       case 2: input[i]=$('<input id="up2" placeholder="工种等级" class="newup"></input>'); break;
//       case 3: input[i]=$('<input id="up3" placeholder="基本工资" class="newup"></input>'); break;
//       default:;
//     }
//     $("#upArea").append(input[i]);
//   }
//   $("#upArea").append(exec);
//   document.getElementById("update").onclick=function(){hide("input",".newup", "update", "更新工种","uptitle");
//   document.getElementById("update").onclick=function(){upOper()};
//   }
//   document.getElementById("update").innerHTML="完成更新";
//   document.getElementById("execupdate").onclick=function(){sqlUpdate()}
// }
function sqlUpdate(){//执行update操作
  var i, upvalue=[], Id
  for(i=0;i<4;i++){
    Id="up"+i
    upvalue[i]=document.getElementById(Id).value
  }
  // if (upvalue[0]=="") {
  //   alert("编号为必填项！")
  //   return
  // }
  if (upvalue[1]=="" && upvalue[2]=="" && upvalue[3]=="") {
    alert("请至少输入一项要改动的内容！")
    return
  }
  db.transaction(function (tx) {
     tx.executeSql('select * from Branch where Bno=?',[upvalue[0]],
     function (tx, results) {
       tmp=results;
       if(tmp.rows.length==0){
         alert("没有该工种！")
         return
       } else {
         var oldvalue=[]
         oldvalue[1]=tmp.rows.item(0).Bname
         oldvalue[2]=tmp.rows.item(0).Blevel
         oldvalue[3]=tmp.rows.item(0).Bsalary
         for (var i = 1; i < 4; i++) {
           if (upvalue[i]=="") {
             upvalue[i]=oldvalue[i]
           }
         }
       }

         db.transaction(function (tx) {
            tx.executeSql('update Branch set Bname=?, Blevel=?, Bsalary=? where Bno=?',[upvalue[1],upvalue[2],upvalue[3],upvalue[0]],
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
              alert(tmp.message+"lolo");
            });
         });
     },
     function (tx, errmeg) {
       tmp=errmeg;
       alert(tmp.message+"haha");
     });
  });


}


//添加操作
function addOper(){
  var addtip=$("<h5></h5>").text("请输入要添加的记录信息")
  var inputsadd = $('<div class="newadd" id="newadd"></div>')
  $("body").append(inputsadd)
  $('#newadd').append(addtip)
  var input=[],i,exec=$('<input id="execadd" type=button value="添加"  class="newadd"></input');
  for(i=0;i<4;i++){
    switch (i) {
      case 0: input[i]=$('<input id="add0" placeholder="工种编号" class="newadd"></input>'); break;
      case 1: input[i]=$('<input id="add1" placeholder="工种名称" class="newadd"></input>'); break;
      case 2: input[i]=$('<input id="add2" placeholder="工种等级" class="newadd"></input>'); break;
      case 3: input[i]=$('<input id="add3" placeholder="基本工资" class="newadd"></input>'); break;
      default:;
    }
    $("#newadd").append(input[i]);
  }
  $("#newadd").append(exec);
  document.getElementById("execadd").onclick=function(){sqlAdd()}
  hide(".newadd","emp2","添加工种","添加完成")
}
function sqlAdd(){//执行add操作
  var i, addvalue=[], Id
  for(i=0;i<4;i++){
    Id="add"+i
    addvalue[i]=document.getElementById(Id).value
    if (addvalue[i]=="") {
      alert("请输入完整信息")
      return
    }
  }

  db.transaction(function (tx) {
     tx.executeSql('insert into Branch values(?,?,?,?) ',[addvalue[0],addvalue[1],addvalue[2],addvalue[3]],
     function (tx, results) {
       tmp=results;
       if(tmp.rowsAffected==0){
         alert("插入失败！")
       } else {
         alert("已插入！");
       }
     },
     function (tx, errmeg) {
       tmp=errmeg;
       alert(tmp.message);
     });
  });

}

//删除操作
// function delOper(){
//   var input = $('<input class="newdel" id="delvalue"></input>'),
//     exec=$('<input type=button id="execdelete" value="删除"  class="newdel"></input');
//   $("#delArea").append(input);
//   $("#delArea").append(exec);
//   document.getElementById("delete").onclick=function(){hide("input",".newdel", "delete", "删除工种","deltitle");
//   document.getElementById("delete").onclick=function(){delOper()};
//   }
//   document.getElementById("delete").innerHTML="完成删除";
//   document.getElementById("execdelete").onclick=function(){sqlDelete()}
// }

function delOper(){
  var inputsdel = $('<div class="newdel" id="newdel"></div>'),
    deltip=$("<h5></h5>").text("请输入要删除的工种编号")
  $("body").append(inputsdel)
  $("#newdel").append(deltip)
  var inputdel=$('<input placeholder="工种编号" class="newdel" id="delBno"></input></input>')
  $("#newdel").append(inputdel)
  var execdel = $('<button id="subdel"></button>').text("提交")
  $("#newdel").append(execdel)
  document.getElementById('subdel').onclick=function(){sqlDelete()}
  hide(".newdel","emp1","删除工种","删除完成")
}
function sqlDelete(){//执行删除语句
  var Bno=document.getElementById("delBno").value;
  if (Bno=="") {
    alert("请输入工种编号！")
  } else {
    db.transaction(function (tx) {
       tx.executeSql('delete from Branch where Bno=?',[Bno],
       function (tx, results) {
         tmp=results;
         if(tmp.rowsAffected==0){
           alert("表中没有该工种！")
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


function getInfo(){
  var showtitle=$('<h5 class="new"><br><div class="col-xs-3" id="Eno">工种编号</div>\
    <div class="col-xs-3" id="Omonth">工种名</div>\
    <div class="col-xs-3" id="Otype">等级</div>\
    <div class="col-xs-3" id="Onum">基本工资</div><br></h5>')
  $("body").append(showtitle)
  var showlist=$('<ul class="new list-group" id="listtitle"></ul>')
  $("body").append(showlist)
  db.transaction(function(tx){
    tx.executeSql('select * from Branch',[],
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

//获取sql结果并显示
// function getInfo(){
//   db.transaction(function (tx) {
//      tx.executeSql('SELECT * FROM Branch',[],
//      function(tx, results){
//        branchInfo=results;
// //       alert("success");
//        resultToLists(branchInfo);//转换并显示
//      },
//      function(tx,errmeg){
//        alert("faild");
//      });
//   });
// }
//移除信息
// function hide(item, cls, iid, text, idd){
//    $(item).remove(cls);
//   document.getElementById(iid).innerHTML=text;
//   document.getElementById(idd).style.visibility='hidden'
// }
//把sql返回结果转换并显示
function resultToLists(){
  if(tmp.rows.length==0) {
    //空
  } else {
    var bno, bname, blevel, bsalary, len=tmp.rows.length, i;
    rows.length=len;
    for(i=0; i<len; i++) {
       bname = $('<div class = "col-xs-3"></div>').text(tmp.rows.item(i).Bname);
       blevel = $('<div class = "col-xs-3"></div>').text(tmp.rows.item(i).Blevel);
       bsalary = $('<div class = "col-xs-3"></div>').text(tmp.rows.item(i).Bsalary);
       bno = $('<div class = "col-xs-3 new"></div>').text(tmp.rows.item(i).Bno);
       var clrflt = $('<div class = "clear-float"></div>');
       var newli = $('<li class = "new list-group-item"></li>').append(bno, bname, blevel, bsalary, clrflt);
       $("#listtitle").append(newli);
    }
  }
  hide(".new","emp0","显示全部工种信息","隐藏全部工种信息")
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
