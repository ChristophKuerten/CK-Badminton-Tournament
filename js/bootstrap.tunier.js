var spielerAnzahl;
var playercount;
var playerTableCode;
var playerDataforTree = {player:[]};		//solution and reason: "value",  http://stackoverflow.com/questions/4538269/adding-removing-items-from-json-data-with-jquery
function calculateProgress (valueProgressAdd){
//	console.log("bin in der function "+ valueProgressAdd+ " "+ valueProgressOld);
	valueProgressOld = $("#progressTunier").attr("aria-valuenow");
//	console.log("aktueller Wert "+ valueProgressOld)
	valeur = +valueProgressOld + +valueProgressAdd
//	console.log("aktueller Wert "+ valeur)
	$('#progressTunier').css('width', valeur+'%').attr('aria-valuenow', valeur);    
};
function calculatePlayer (factorplayer){
//	console.log("bin in der function "+ valueProgressAdd+ " "+ valueProgressOld);
//	console.log(factorplayer);
	controlerPlayer = (spielerAnzahl - 1) * factorplayer;
//	console.log(controlerPlayer);
//	console.log(playercount);
	playerold = $("#progressSpieler").attr("aria-valuenow");
	playercount = playercount + 1;
	if (playercount < spielerAnzahl) {
		valeur = +playerold + +factorplayer;
		$('#progressSpieler').css('width', valeur+'%').attr('aria-valuenow', valeur); 
		$('#progressSpieler').html(playercount + " Player");   
	} else {
		valeur = +playerold + +factorplayer;
		$('#progressSpieler').css('width', valeur+'%').attr('aria-valuenow', valeur);
		$('#progressSpieler').text(playercount + " Player"); 
		$("#addeinzelPlayer").prop("disabled", true);
	}

};
function fillSinglePlayerlist(name,vorname,verein){
//	tablebegin = "<table class='table'><thead><tr><th>#</th><th>First Name</th><th>Last Name</th><th>Club</th></tr></thead><tbody >";
//	tableclose = "</tbody></table>"
	tableClass = "";
	//console.log(playerTableCode);
	if (playercount%2 == 0){
    	tableClass ="active"
    }
    playerTableCode ="<tr class='"+tableClass+"'><th scope='row'>"+playercount+"</th><td>"+name+"</td><td>"+vorname+"</td><td>"+verein+"</td></tr>"
    $("#playerTable tbody").append(playerTableCode);

    playerDataforTree.player.push(
    	{id: playercount, name: name, vorname: vorname, verein: verein}
	);
    
};

function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');

};

$( document ).ready(function() {
	playercount = 0;
//    console.log( "ready!" );
    $("#secondGeschlecht").prop("disabled", true);
    $("#thirdTunierart").prop("disabled", true);
    $("#fourthAnzahl").prop("disabled", true);
//    $("#fifthSubmit").prop("disabled", true);
 
// enable Raidos for tunier planung//
	$("#einzel").click(function() {	
		$("#secondGeschlecht").prop("disabled", false);
		valueadd = 25;
		calculateProgress (valueadd); 
	});
	$("#doppel").click(function() {
		$("#secondGeschlecht").prop("disabled", false);
		valueadd = 25;
		calculateProgress (valueadd ); 
	});
	$("#mixed").click(function() {
		$("#thirdTunierart").prop("disabled", false);
		$("#secondGeschlecht").prop("disabled", true);
		valueadd = 50;
		calculateProgress (valueadd); 
	});
// enable Raidos for tunier planung//
	$("#männlich").click(function() {
		$("#thirdTunierart").prop("disabled", false);
		valueadd = 25;
		calculateProgress (valueadd);
	});
	$("#weiblich").click(function() {
		$("#thirdTunierart").prop("disabled", false);
		valueadd = 25;
		calculateProgress (valueadd);
	});
// enable Raidos for tunier planung//
	$("#doppelko").click(function() {
		$("#fourthAnzahl").prop("disabled", false);
		valueadd = 25;
		calculateProgress (valueadd);
	});
	$("#schweitzer").click(function() {
		$("#fourthAnzahl").prop("disabled", false);
		valueadd = 25;
		calculateProgress (valueadd);
	});
	$("#liga").click(function() {
		$("#fourthAnzahl").prop("disabled", false);
		valueadd = 25;
		calculateProgress (valueadd);
	});
	$("#ko").click(function() {
		$("#fourthAnzahl").prop("disabled", false);
		valueadd = 25;
		calculateProgress (valueadd);
	});
	$("#anzahlSpielerField").click(function(){
		valueadd = 25;
		calculateProgress(valueadd);
	});
   	$( "#fifthSubmit" ).click(function() {
    	var disziplin = $("input:radio[name='optionsDisziplin']:checked").val();
    	var geschlecht = $("input:radio[name='optionsGeschlecht']:checked").val();
    	var tunier = $("input:radio[name='optionsTunierart']:checked").val();
    	spielerAnzahl = $('#anzahlSpielerField').val();
    	$('#tunierOptions').text(disziplin +"  "+geschlecht+" "+tunier+" "+spielerAnzahl);
		activaTab('spieler');
		if (disziplin != "einzel") {
			if (disziplin == "doppel") {
				//console.log("Doppel");
		        $("#mixedGame").hide();
		        $("#singleGame").hide();		        
		    } else {
		    	//console.log("Mixed");
		    	$("#doubleGame").hide();
		        $("#singleGame").hide();
		    }	   
		} else {
			//console.log("Einzel");
		    $("#mixedGame").hide();
		    $("#doubleGame").hide();
		}

   	});
   	$("#addeinzelPlayer").click(function(){
   		//console.log("klappt")
   		var factorplayer=100/spielerAnzahl;
   		calculatePlayer(factorplayer);
   		var nameEinzel = $('#nameEinzel').val();
    	var vornameEinzel = $('#vornameEinzel').val();
    	var vereinEinzel = $('#vereinEinzel').val();
    	if (playerold <= controlerPlayer) {
    		fillSinglePlayerlist(nameEinzel, vornameEinzel, vereinEinzel);
    	};
    	
   		//console.log(nameEinzel +"  "+vornameEinzel+" "+vereinEinzel);
   	});
   	$("#getJson").click(function(){
   		console.log(playerDataforTree);
   	});


});

