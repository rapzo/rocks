function myFunction() {
	var cenas = $('#search_input').val();
	var html = '<p id="demo">' + cenas + '</p>';
	
	console.log(html);
	for(i = 0; i < 10; i++){ 
		$("#search-results").append(html);
	}

}