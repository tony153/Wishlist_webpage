// JavaScript Document
var Wish_list=new Array();
initialization();
function initialization(){
	$("#qi_i1").val(localStorage.getItem("qi_i1"));
	$("#qi_i2").val(localStorage.getItem("qi_i2"));
//	$("#qi_i3").val(localStorage.getItem("qi_i3"));
	
	if(JSON.parse(localStorage.getItem("Wish_list")) != null ){
		Wish_list=JSON.parse(localStorage.getItem("Wish_list"));
		
		for(let i=0;i<Wish_list.length;i++){
			$("#record ul").prepend("<li><div class='cont'>"+Wish_list[i]+"<div id='del'>❌</div></div></li>");
		}
		checkListIsempty();
	}
	
}

function checkListIsempty(){
	if(Wish_list.length===0||Wish_list===null){
		$("#record ul").append("<empty>~空空如也~ (≧д≦ヾ)</empty>");
	}else if(Wish_list.length>0){
		$("empty").remove();
	}
}

$("#input textarea").on("focus",function(){
	$("#input textarea").keypress(function(event){	
		if(event.keyCode==='\n'.charCodeAt){
			let temp=$("#input textarea").val();
			$("#input textarea").val(temp+"\n");
		}
	});
});

$("#submit_button").on("click",function(){
	
	if($("#input textarea").val().trim()!==""){
		Wish_list.push($("#input textarea").val().replace(/\n|\r\n/g,"<br>"));
		$("#record ul").prepend("<li><div class='cont'>"+Wish_list[Wish_list.length-1]+"<div id='del'>❌</div></div></li>");
		$("#input textarea").val("");
		checkListIsempty();
		
		localStorage.setItem("Wish_list", JSON.stringify(Wish_list));
	}
});


$("#record ul").on("click","#del",function(){
	Wish_list.splice((Wish_list.length-1-$(this).closest("li").index()),1);
	$(this).closest("li").remove();
	checkListIsempty();
	
	localStorage.setItem("Wish_list", JSON.stringify(Wish_list));
});


$("#setting_button").on("click",function(){
	$("#setting_box").show(0).css({
		"max-height": "150px",
		"top": "0",
		"display": "block",
		"border-bottom-left-radius":"20px",
		"border-bottom-right-radius": "20px",
		"margin-bottom": "0px",
	});
	$("#setting_button").hide(500);
});
$("#set").on("click",function(){
	$("#setting_box").css({
		"max-height": "0",
		"top":"-150px",
		"border-bottom-left-radius":"0px",
		"border-bottom-right-radius": "0px",
		"margin-bottom": "-30px"
	});
	setTimeout(function(){ $("#setting_box").css({"display": "none"}); }, 1000);
	$("#setting_button").show(500);
	localStorage.setItem("qi_i1", $("#qi_i1").val());
	localStorage.setItem("qi_i2", $("#qi_i2").val());
//	localStorage.setItem("qi_i3", $("#qi_i3").val());
});




$("#qi_current_date").on("click",function(){
	let dt = new Date();
	let current_date=dt.getDate()+"/"+(dt.getMonth()+1)+"/"+dt.getFullYear()+" ";
	let temp=$("#input textarea").val();
	$("#input textarea").val(temp+current_date);
});

$("#qi_current_time").on("click",function(){
	let dt = new Date();
	let current_time=dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds()+" ";
	let temp=$("#input textarea").val();
	$("#input textarea").val(temp+current_time);
});

$("#qi_enter").on("click",function(){
	let temp=$("#input textarea").val();
	$("#input textarea").val(temp+'\n');
});
$("#qi_clear").on("click",function(){
	$("#input textarea").val("");
});

$("#qi_s1").on("click",function(){
	let temp=$("#input textarea").val();
	$("#input textarea").val(temp+$("#qi_i1").val());
});
$("#qi_s2").on("click",function(){
	let temp=$("#input textarea").val();
	$("#input textarea").val(temp+$("#qi_i2").val());
});
//$("#qi_s3").on("click",function(){
//	let temp=$("#input textarea").val();
//	$("#input textarea").val(temp+$("#qi_i3").val());
//});


$("#clear_qs").on("click",function(){
	$("#qi_i1").val("");
	$("#qi_i2").val("");
	localStorage.removeItem("qi_i1");
	localStorage.removeItem("qi_i2");
})



function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle + 360 : angle;
}

$("#draw").on("click",function(){
	//$(".card_title").hide();
	//$("#drawout_result").hide();
	let random_index=Math.floor(Math.random() * Wish_list.length);
//	console.log("Wish_list.length: "+Wish_list.length);
//	console.log("random_index: "+random_index);
	
	let check_card_bg=setInterval(function(){
		if(getRotationDegrees($("#result_cart"))===180){
			$("#result_cart").css("background-image","url('img/Pokerback.jpg')");
			$(".card_title").hide();
			$("#drawout_result").hide();
		}
		else{
			$("#result_cart").css("background-image","");
			$(".card_title").show();
			$("#drawout_result").show();
			$("#drawout_result").css("text-shadow","0 0 8px rgba(225,0,0,1)");
		}
	},1);
	
	if(Wish_list.length===0||Wish_list.length===null||Wish_list.length==undefined){
		$("#drawout_result").html("null<br>!清單為空!");
	}else{
		$("#drawout_result").html(Wish_list[random_index]);
	}
	$('body').css('overflow','hidden');
	
	$("#draw_result").fadeIn(500);
	setTimeout(function(){
		//$(".card_title").fadeIn(1000);
		//$("#drawout_result").fadeIn(1100);
		$("#drawout_result").css("text-shadow","0 0 0px rgba(0,0,0,1)");
	},1300);
	$("#draw_result").css({"display":"flex"});
});
$("#finish").on("click",function(){
	$("#draw_result").fadeOut(500);
	$('body').css('overflow',"");
	clearInterval(check_card_bg);
});




$("#clear_record").on("click",function(){
	localStorage.removeItem("Wish_list");
	Wish_list=new Array();
	$("#record ul li").remove();
	console.log(JSON.stringify(Wish_list));
})


