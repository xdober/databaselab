window.onload = function(){
  var db = openDatabase('testDB', '1.0', 'Test DB', 32 * 1024 * 1024)
  var arr = document.getElementsByTagName('button');
  for(var i = 0;i<arr.length;i++){
  	arr[i].onclick = function(){
  		var sid = this.id;
      window.location=sid+".html";
  	}
  }
}
$('button').addClass("btn btn-success")
