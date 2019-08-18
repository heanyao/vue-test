$(function(){
	$(document).on("click",".tit .share",function(){
		$(".dialogTitle").empty().append("分享到");
		$(".dialogMask").fadeIn();
    	$(".divDialog").fadeIn();
    	$(".bdsharebuttonbox").show();
    	$(".usualMessage").hide();
	});
	
	$(document).on("click",".divDialog .dialogClose",function(){
		$(".dialogMask").fadeOut();
    	$(".divDialog").fadeOut();
    	$(".bdsharebuttonbox").fadeOut();
	});
})


