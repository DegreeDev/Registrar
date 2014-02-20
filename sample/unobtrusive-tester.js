unobtrusive.setup("all", ".apply", function(index, element){
	
	var $e = $(element); 
	
	$e.css("height", 50).css("width", 50).css("background-color", "red");
	
	$e.on('click', function(){
		alert("clicked");
	});

});