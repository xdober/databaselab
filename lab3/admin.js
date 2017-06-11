const loginState = sessionStorage.getItem('state');
$('.true-body').hide();
$('#success-alert').hide();
window.onload = function(){
if (loginState) {
  $('.true-body').show();
  var db = openDatabase('testDB', '1.0', 'Test DB', 32 * 1024 * 1024)
  var arr = document.getElementsByTagName('button');
  for(var i = 0;i<arr.length;i++){
  	arr[i].onclick = function(){
  		var sid = this.id;
      window.location=sid+".html";
  	}
  }
} else {
  showAlert()
}
}
$('button').addClass("btn btn-success")
function showAlert() {
    $('#success-alert').slideDown(500, function(){
      $('#success-alert').fadeTo(2500, 500).slideUp(500, function(){
        $('#success-alert').alert('close');
        window.location="index.html"
      });
    });

}
