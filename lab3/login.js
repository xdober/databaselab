var db = openDatabase('testDB', '1.0', 'Test DB', 32 * 1024 * 1024);
var tmp
document.getElementById("login").onclick=function(){login()}
function login(){
  var username=document.getElementById("username").value,
    password=document.getElementById("password").value;
    db.transaction(function (tx) {
       tx.executeSql('select psword from user where username=?',[username],
       function (tx, results) {
         tmp=results;
         if(tmp.rows.length==0){
           alert("用户名错误！")
         } else if(password==tmp.rows.item(0).psword){
           window.location="admin.html";
         } else{
           alert("密码错误！");
         }
       },
       function (tx, errmeg) {
         tmp=errmeg;
         alert(errmeg);
       });
    });

}
