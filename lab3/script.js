var db = openDatabase('testDB', '1.0', 'Test DB', 32 * 1024 * 1024);
var tmp
db.transaction(function (tx) {
   tx.executeSql('CREATE TABLE jobs (name primary key, job)');
});
db.transaction(function (tx) {
   tx.executeSql('INSERT INTO jobs (name, job) VALUES ("熊世杰", "全栈工程师")');
   tx.executeSql('INSERT INTO jobs (name, job) VALUES ("能世木", "全栈工程师")');
});
//document.getElementById("submit").onclick=function(){submitJob()};
function submitJob(){
  var name=document.getElementById("name").value,
    job=document.getElementById("index").value;
  db.transaction(function (tx) {
     tx.executeSql('INSERT INTO jobs (name, job) VALUES (?,?)',[name,job],
     function (tx, results) {
       tmp=results;
     },
     function(tx,errmeg){
       tmp=errmeg;
     });
  });
}
//document.getElementById("exe").onclick=function(){execSQL()};
function execSQL(){
  var text=document.getElementById("sqlText").value;
  db.transaction(function(tx){
    tx.executeSql(text,[],function (tx, results){alert("succeed!")},function(tx,errmeg){alert("faild")});
  });
}
