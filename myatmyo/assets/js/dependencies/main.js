

$(document).ready( function() {	

	var fileId = 0;
	var divId = 0;
	var arrayIndex;
	var oldDivId;

	var centerDiv = $('#centerID');

	var listAndDivArray = [];

	// Grab the first sheet, regardless of media
	// var sheet = document.styleSheets[0];
	// sheet.insertRule("#conditions { border-bottom: 3px solid blue; }", 1);
	// console.log(document.styleSheets[0]);	

	$("#restoreButtonID").click(function(){

		if($(this).html() == "-"){

			$(this).html("+");

			$("#rightID").parent().css({position: 'absolute'});

			$("#rightID").css({bottom:0, right: 0,width:"5%", height:"25px",position:'absolute'});

			$(".center").css({width:"86%"});

			$(".bottomOfCenter").css({width:"86%"});

		}

		else{

			$(this).html("-");

			$("#rightID").parent().css({position: 'absolute'});

			$("#rightID").css({right:0,height:'100%',width:'15%',position:'absolute'});

			$(".center").css({width:" 71%"});	

			$(".bottomOfCenter").css({width:"71%"});
		}	

	});

	$('.createButton').click(function(){

		var newTextBoxDiv = $('<div/>').attr("id", "textBoxID");		

		newTextBoxDiv.after().html('<form action=""><input type="text" id="textbox"></form>');			

		if($('#textBoxID').length == 0){

			$('#treeID li').show();

			$('#minusID').text('- -');


			$('.newProjectCreate').append(newTextBoxDiv);

			$('#textbox').keydown(function(event) {

				var message = $("#textbox").val();

				if (event.keyCode == 13) {

					if (message == "") {

						alert("Enter Some Text In Textarea");

					} else {

						$('#textBoxID').remove();

						//var div =$('<div/>').appendTo('#tree').attr({"class":"listdiv"});

						//var ul = $('<ul/>').appendTo('.newProjectCreateDiv').attr({"id":"tree"});	

						//var spans = $('<span/>').appendTo('#treeID').attr({"class":"context-menu-one"});

						var li = $('<li id="'+ (++fileId) +'" />').appendTo('#treeID').text(message);
						console.log("fileId " + fileId);
						divId = "dtDiv" + fileId;

						console.log("divId : " + divId);

						var listAndDiv = {
								listId : "",
								divElement : ""
							};						
							
						var div = $('<div id="'+ divId +'" />').appendTo('#centerID').hide();
						
						div = drawDecisionTable(message , div);
						

						console.log("div " + $(div).html());

						listAndDiv.listId = fileId;
						listAndDiv.divElement = div;

						listAndDivArray.push(listAndDiv);						
												
						$(div).hide();
					}
						// return false;
				}

			});
			

			$(".newProjectCreate ul").on("click", "li", function(event){

				$("#centerID").empty();

		    	var id = $(this).attr('id');		    	
		    	
		    	for (var i=0; i<listAndDivArray.length; i++) {

		    		if (listAndDivArray[i].listId == id) {
		    			//console.log("element in array " + $(listAndDivArray[i].divElement).html());
		    			$("#centerID").prepend($(listAndDivArray[i].divElement).show());
		    			
		    			break;
		    		}
		    	}

		    	$("#centerID div:not(#dtDiv" + id + ")").hide();
		    	
		    	console.log("listId : " + id);
		
			});	

		}			

	});

	
	$('#minusID').click(function(){
			
			if($('#minusID').text()=='- -'){

				$('#treeID li').hide("fast", function(){

					$('#minusID').text('++');

				});

			}else{

				$('#treeID li').show("fast", function(){

					$('#minusID').text('- -');

				});

			}

		});	

	
	function drawDecisionTable(fileName, dtDiv) {		

		var divId = "#" + $(dtDiv).attr('id');

		$(dtDiv).append('<h2 align="center">' + fileName + '</h2>');
		$(dtDiv).append('<table id="dtTable"></table>');
		var table = $(divId +' table');
		  
		table.append('<thead id="header"> <tr> <th></th> <th class="task"></th> </tr> </thead>');
		//$('<img id="createdImage" src="some.jpg"/>').appendTo(document.body).css(style);
		//$('<tbody id="condition"/>').appendTo(table).css("border-bottom", "3px solid blue");
		//$("<style/>").text("#condition { border-bottom: 3px solid blue; }").appendTo("head");
		table.append('<tbody id="condition" class="condition" style="border: 3px solid blue;"></tbody>');
		table.append('<tbody id="action"></tbody>');
		//$("<style/>").text("#condition { border-bottom: 3px solid blue; }").appendTo("head");
		//$('head').append("< style > #condition { border-bottom: 3px solid blue;}  < /style >");
		//$("head").append("<style/>").text("#condition { border-bottom: 3px solid blue; }");
		
		// console.log("dtDiv " + $(dtDiv).html());
		//console.log("table " + $(table).html());		

		var response = '{"dt":{"conditions":[""],"actions":[""],"rules":[{"conditions":[],"actions":[]}]}}';
		//var response = '{"dt":{"conditions":["c1","c2","c3"],"actions":["a1","a2", "a3"],"rules":[{"conditions":["rc1","rc2","rc3"],"actions":["ra1","ra2", "a3"]},{"conditions":["r3c1","r3c2","r3c3"],"actions":["r3a1","r3a2", "a3"]},{"conditions":["r2c1","r2c2","r2c3"],"actions":["r2a1","r2a2", "a3"]}]}}';
		
		//convert string to JSON
		var dt = $.parseJSON(response);

		var conditions = dt.dt.conditions;
		var actions = dt.dt.actions;
		var rules = dt.dt.rules;

		var headerRow = $(divId +' #header tr');
		var conditionSection = $($(table).find('tbody')[0]);
		var actionSection = $($(table).find('tbody')[1]);

		//alert("conditionSection " + $('table').find('tbody')[0].html());

		$.each(conditions, function(index, condition) {
			$(conditionSection).append('<tr class="task"> <th>' + (index+1) +'</th><td><input type="text" value="' + condition +'"></td></tr>');		
		});
		

		$.each(actions, function(index, action) {
			$(actionSection).append('<tr class="task"> <th>' + (index+1) +'</th><td><input type="text" value="' + action +'"></td></tr>');		
		});

		$.each(rules, function(i, rule) {	
			$(headerRow).append('<th class="task">' + (i+1) +'</th>');
		});

		var rows = $(conditionSection).find('tr');

		$.each(rows, function(j, row) {
			$.each(rules, function(k, rule) {
				if(typeof(rule.conditions[j])  === "undefined") {
					rule.conditions[j] = "";
				}
				$(row).append('<td><input type="text" value="' + rule.conditions[j] +'"></td>');
			});
		});

		rows = $(actionSection).find('tr');

		$.each(rows, function(j, row) {
			$.each(rules, function(k, rule) {
				if(typeof(rule.actions[j])  === "undefined") {
					rule.actions[j] = "";
				}
				$(row).append('<td><input type="text" value="' + rule.actions[j] +'"></td>');
			});
		});

		// the first row will be active by default		 
		var inputElement =$(conditionSection).children().eq(0).find('td').first().find("input");

		$(inputElement).focus();		

		$(conditionSection).children().eq(0).find('td').first().addClass("active");			

		var lastConditionRow = $(divId + " #condition tr:last" );

		console.log("last row " + $(lastConditionRow).html());
		$(lastConditionRow).css("border-bottom", "3px solid blue");

		//$("#condition").css("border", "10px solid red");

		return dtDiv;
		//$("#condition").css({ borderBottom: "2px solid #ff4141" });
		//alert("condition : " + $("#condition").html());
		//document.getElementById("condition").style.borderBottom = "15px solid blue";
		// $("#condition").css("border", "10px solid red");
		// alert("css of condition : " + $("#condition").css("border"));
		//$("p").css("background-color", "yellow");

		//$(".menu").css({ "border-bottom": "2px solid #ff4141": });
		//$("table").css("border", "3px solid blue");

		//$(conditionSection).css("borderBottom", "3px solid blue");
		//alert($(conditionSection).html());
		// $(this).attr('style', 'text-align: center');
	}



});

$( function() {

	$( "#treeID" ).selectable();	

});

