$( document ).ready(function() {
	$("#ticketInput").focus();
	var JiraBaseURL = "";
	chrome.storage.sync.get("value", function(baseUrl) {
	JiraBaseURL = baseUrl.value;
	});
	chrome.storage.sync.get("allProjList", function(options) {
   		var i;
		for(i=0; i < options.allProjList.length; i++){
			$("#dropdown").append('<option value="'+options.allProjList[i]+'">'+options.allProjList[i]+'</option>');
		}	
	});	
	 $(document).keydown(function(event) { 
 		var code = event.keyCode ;
		if(code == 13){
			$("#open-button").trigger('click');
		}
	});
	$("#open-button").click(function(event) {
		var objPobjSelValue = $( "#dropdown option:selected" ).text();
		var ticket = $("#ticketInput").val();
		
		if(typeof JiraBaseURL == "undefined" || JiraBaseURL ==""  || typeof objPobjSelValue == "undefined" || objPobjSelValue == "" ){
		$("#errorname").html("Please add a JIRA URL and Project in settings");
		$("#errorname").css("color", "red");
		}
		 else if(ticket.length == 0)
		{
				$("#ticketInput").addClass("error-red");	
		}
		else{	
			window.open(JiraBaseURL+objPobjSelValue+'-'+ticket);
		}	
	});
});
