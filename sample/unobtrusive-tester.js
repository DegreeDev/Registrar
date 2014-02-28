unobtrusive.setup("all", ".apply", function(index, element){
	console.log("ran callback for all");
	var $e = $(element); 
	
	$e.css("height", 50).css("width", 50).css("background-color", "red");
	
	$e.on('click', function(){
		alert("clicked");
	});

});

unobtrusive.setup("a", ".apply1", function(index, element){
	var $e = $(element);
	$e.on("click", function(){
		$e.append("<span>test</span");
	});

	$e.css("height", 50).css("width", 50).css("background-color", "blue");
});