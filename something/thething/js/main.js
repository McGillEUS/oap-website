$(document).ready(function(){

	if($("#login").length>0){
		$('#login form').ajaxForm(function() { 
			var u = $("#usr").val().toLowerCase().replace(/\s+/g, '');
			var p = $("#pwd").val();
			var t = $.md5($.md5(u));
			var t2 = $.md5($.md5($.md5(p)));
			if(t === "ddce9ee9c8557ffc2749b93ddf623057" && t2 === "9b93f7a4f055772b66769c029bf0358d"){
				window.location.href = "home.html";
			}
			else{
				alert("WRONG");
				$("#usr").val('');
				$("#pwd").val('');
			}
		}); 
	}

	if($("#main").length>0){
		console.log("test");
		console.log($(".item").first().is(":visible"));
		setTimeout(function(){
			tile()
		},2000);
		new WOW().init();

		smoothskroll();
	}
});


$('input').keypress(function (e) {
	console.log("submit");
  if (e.which == 13) {
    $('#login form').submit();
    return false;  
  }
});

function tile(){
	console.log("two seconds later");
    $('.item-container').masonry({
    itemSelector: '.item'
    });
}

function smoothskroll(){
	smoothScroll.init({
	    speed: 1000, // Integer. How fast to complete the scroll in milliseconds
	    easing: 'easeInOutCubic' // Easing pattern to use
	});
}


$("#song").click(function(){
	var player = $("#50")[0];
	player.paused? player.play():player.pause();
	
});


$(".vid a").click(function(){
	var player = $(this).parent().find("video")[0];
	player.paused? player.play():player.pause();
});