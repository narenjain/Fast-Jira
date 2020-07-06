$(document).ready(function(){
  var maxField = 3;
  var addButton = $('.add_button');
  var wrapper = $('.field_wrapper');
  var fieldHTML = '<div><input type="text" style="border-radius:5px;margin-bottom:6px;" name="field_name" value="" placeholder="Additional Project"/><a href="javascript:void(0);" class="remove_button"><img style = "margin-top:5px;"src="Delete.png"/></a></div>'; //New input field html 
  var x = 1;
  chrome.storage.sync.get("value", function(jiraBaseUrl) {
    if(typeof jiraBaseUrl.value != "undefined"){
		$("#jUrl").val(jiraBaseUrl.value);	 
		}
   });
   chrome.storage.sync.get("allProjList", function(item) {
   var i;
    for (i = 1; i < item.allProjList.length; i++) {
     $(addButton).trigger('click');
    }	
    var j = 0;
    $("[name='field_name']").each(function() {
      if(typeof item.allProjList[j] != "undefined"){
      this.value = item.allProjList[j];
      }
      j++;
    });
	});
 $(addButton).click(function(){
      if(x < maxField){ 
          x++;
          $(wrapper).append(fieldHTML);
      }
  });
  $(wrapper).on('click', '.remove_button', function(e){
      e.preventDefault();
      $(this).parent('div').remove();
      x--; 
  });
  $("#save-button").click(function(event) {
    var allProj = [];
    $("[name='field_name']").each(function() {
      if(this.value != ""){
      allProj.push(this.value);
      }
    });
    var JiraBaseUrl = $("#jUrl").val();
		chrome.storage.sync.set({"value": JiraBaseUrl}, function() {
         });
    chrome.storage.sync.set({"allProjList": allProj}, function() {
        });
        $(".options-status").html("Please add a JIRA URL and Project in settings");
        window.close();         

  });
});  

