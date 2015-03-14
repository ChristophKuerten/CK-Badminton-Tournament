var spielerAnzahl;
var playercount;
var playerTableCode;
var playerDataforTree = {player:[]};		//solution and reason: "value",  http://stackoverflow.com/questions/4538269/adding-removing-items-from-json-data-with-jquery
var tournamentTreefirstroundcount;
var randomNumber;
var startedplayer = 0;
var setzliste = [];
var setzlisterLaenge = 1;
var turnier;
var gameCount;
var roundCount;
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
	tableClass = "";
	if (playercount%2 == 0){
    	tableClass ="active";
    }
    playerTableCode ="<tr class='"+tableClass+"'><th scope='row'>"+playercount+"</th><td>"+name+"</td><td>"+vorname+"</td><td>"+verein+"</td></tr>";
    $("#playerTable tbody").append(playerTableCode);


    playerDataforTree.player.push(
    	{id: playercount, name: name, vorname: vorname, verein: verein}
	);
    
};
function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
};
function startdoppelko(){
	var i = 0;
	var z = 0;
	var tTScount = 4;
	var tTScount2 = 0;
	var tournamentTreeSystem = 0;
	var newjsonadd = {};
	var gRoundCount = 1;
	var vRoundCount = 1;
	var aRoundCount = 0;
	var freilose = 0;
	var roundTournament = "round";
	while (setzlisterLaenge < startedplayer){
		createsetlist(i,z);
		setzlisterLaenge = setzliste.length;
	}
	loopplayer = startedplayer + 1;
	while (tournamentTreeSystem == 0){
		tTScount2 = tTScount * 2
		if (startedplayer <= 4){
			tournamentTreeSystem = 4;
			tournamentTreeSystem = tTScount2
		}else if (startedplayer > tTScount && startedplayer <= tTScount2){
			tournamentTreeSystem = tTScount2
			gRoundCount = gRoundCount +1;

		}else{
			tTScount = tTScount2;
		}
	}
	tournamentCounter = tournamentTreeSystem;
	while (tournamentCounter != 4){
		tournamentCounter = tournamentCounter / 2
		gRoundCount = gRoundCount +1;
		vRoundCount = vRoundCount +2;
	}
	freilose = tournamentTreeSystem - startedplayer;
	aRoundCount = gRoundCount + vRoundCount +1;
	while (aRoundCount != 0){
		if (aRoundCount == gRoundCount + vRoundCount + 1){
			var tourRound = roundTournament + z;
			newjsonadd[tourRound] = [];
			$.extend(true, playerDataforTree, newjsonadd);
			z = z +1;
			aRoundCount = aRoundCount-1;	
		}
		else if (aRoundCount > vRoundCount){
			var tourRound = roundTournament + "G"+ z;
			newjsonadd[tourRound] = [];
			$.extend(true, playerDataforTree, newjsonadd);
			z = z +1;
			aRoundCount = aRoundCount-1;	
		}else{
			var looserRound = z - gRoundCount;
			var tourRound = roundTournament + "V"+ looserRound;
			newjsonadd[tourRound] = [];
			$.extend(true, playerDataforTree, newjsonadd);
			z = z + 1;
			aRoundCount = aRoundCount-1;	
		}
	}
	console.log(playerDataforTree);
	var gameNumber = 0;
	while (i < startedplayer){
		gameNumber = gameNumber + 1;
		var PlayerOneid;
		var PlayerTwoid;
		if (freilose != 0){
			var setlistplayerOne = setzliste[i] -1;
			var playerofarrayOne = playerDataforTree.player[setlistplayerOne];
			playerTableCode ="<div class='game game"+gameNumber+"'><p>"+playerofarrayOne.name+", "+playerofarrayOne.vorname+ " vs. Freilos </p><input type='text' name='gamebox"+gameNumber+"Set1Player1' id='game"+gameNumber+"Set1Player1' />  vs. <input type='text' name='gamebox"+gameNumber+"Set1Player2' id='game"+gameNumber+"Set1Player2' /><br /><input type='text' name='gamebox"+gameNumber+"Set2Player1' id='game"+gameNumber+"Set2Player1' />  vs. <input type='text' name='gamebox"+gameNumber+"Set2Player2' id='game"+gameNumber+"Set2Player2' /><br /><input type='text' name='gamebox"+gameNumber+"Set3Player1' id='game"+gameNumber+"Set3Player1' />  vs. <input type='text' name='gamebox"+gameNumber+"Set3Player2' id='game"+gameNumber+"Set3Player2' /><br /><button type='button' class='btn btn-default gameButton' id='gameButton"+gameNumber+"' onclick='inserResults(this)'>Enter Result</button><br /></div>";
			$("#tournamentMatches").append(playerTableCode);
			PlayerOneid = playerofarrayOne.id;
			PlayerTwoid = "Freilos";
			freilose = freilose - 1;
		}else{
			var setlistplayerOne = setzliste[i] -1;
			var setlistplayerTwo = setzliste[i+1] -1;
			var playerofarrayOne = playerDataforTree.player[setlistplayerOne];
			var playerofarrayTwo = playerDataforTree.player[setlistplayerTwo];
			playerTableCode ="<div class='game game"+gameNumber+"'><p>"+playerofarrayOne.name+", "+playerofarrayOne.vorname+ " vs. "+ playerofarrayTwo.name+", "+playerofarrayTwo.vorname+"</p><input type='text' name='gamebox"+gameNumber+"Set1Player1' id='game"+gameNumber+"Set1Player1' />  vs. <input type='text' name='gamebox"+gameNumber+"Set1Player2' id='game"+gameNumber+"Set1Player2' /><br /><input type='text' name='gamebox"+gameNumber+"Set2Player1' id='game"+gameNumber+"Set2Player1' />  vs. <input type='text' name='gamebox"+gameNumber+"Set2Player2' id='game"+gameNumber+"Set2Player2' /><br /><input type='text' name='gamebox"+gameNumber+"Set3Player1' id='game"+gameNumber+"Set3Player1' />  vs. <input type='text' name='gamebox"+gameNumber+"Set3Player2' id='game"+gameNumber+"Set3Player2' /><br /><button type='button' class='btn btn-default gameButton' id='gameButton"+gameNumber+"' onclick='inserResults(this)'>Enter Result</button><br /></div>";
			$("#tournamentMatches").append(playerTableCode);
			PlayerOneid = playerofarrayOne.id;
			PlayerTwoid = playerofarrayTwo.id;
			i=i+1;
		}
		playerDataforTree.round0.push(
    		{id: gameNumber, PlayerOne: PlayerOneid ,PlayerTwo: PlayerTwoid, SetOne: "",SetTwo: "", SetThree: "", Winner:""}
		);
		i = i + 1;
	}
	gameNumber = 0;

};
function createsetlist(i,z){
	while (i < startedplayer){
		randomNumber= Math.random();
		var player = Math.round(randomNumber * (startedplayer-1)+1);
		z = 0;
		while (z < startedplayer){
			var zControl = setzliste[z];
			var zControlTest = $.isNumeric(zControl);
		 	if (zControl == player){
		 		z = startedplayer;
		 	}else if (zControlTest == true){
		 		z++;
		 	}else{
		 		console.log
		 		setzliste[z] = player;
		 		z = startedplayer
		 	}
		}
		i++;
	}
};
function inserResults(button){
	var buttonclicked = $(button).attr("id");
	var a = 0;
	var b = 1;
	var resultOfGame = 0;
	var setOne;
	var setTwo;
	var setThree;
	var winner;
	var PlayerOne;
	var PlayerTwo;
	a = buttonclicked.length;
	resultOfGame = +buttonclicked.substring(10, a);
	while (b < 4){
		var playsetOne = '#game'+resultOfGame+'Set'+b+'Player1';
		var playsetTwo = '#game'+resultOfGame+'Set'+b+'Player2';
		PlayerOne = $(playsetOne).val();
		PlayerTwo = $(playsetTwo).val();
		if (b = 1){
			setOne = PlayerOne+ ":"+ PlayerTwo;
		}else if (b == 2){
			setTwo = PlayerOne+ ":"+ PlayerTwo;
		}else if (b == 3){
			setThree = PlayerOne+ ":"+ PlayerTwo;
		}
		console.log(setOne+" / "+setTwo+" / "+setThree);
		b = b +1;
	}
	var playset = '#game1Set1Player1';
//	PlayerOne = $(playset).val();
//	PlayerTwo = $("'#game"+resultOfGame+"Set1Player2'").val();
//	setOne = PlayerOne+ ":"+ PlayerTwo;
//	console.log(playset);
//game"+gameNumber+"Set1Player1

//	console.log(buttonclicked);
//	console.log("Game: "+resultOfGame);
};


$( document ).ready(function() {
// =============================== Test der Setzlisten Schleife ==========================================================



// =============================== Test der Setzlisten Schleife ==========================================================
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
    	turnier = $("input:radio[name='optionsTunierart']:checked").val();
    	spielerAnzahl = $('#anzahlSpielerField').val();
    	$('#tunierOptions').text(disziplin +"  "+geschlecht+" "+turnier+" "+spielerAnzahl);
		activaTab('spieler');
		if (disziplin != "einzel") {
			if (disziplin == "doppel") {
		        $("#mixedGame").hide();
		        $("#singleGame").hide();		        
		    } else {
		    	$("#doubleGame").hide();
		        $("#singleGame").hide();
		    }	   
		} else {
		    $("#mixedGame").hide();
		    $("#doubleGame").hide();
		}
   	});
   	$("#addeinzelPlayer").click(function(){
   		var factorplayer=100/spielerAnzahl;
   		calculatePlayer(factorplayer);
   		var nameEinzel = $('#nameEinzel').val();
    	var vornameEinzel = $('#vornameEinzel').val();
    	var vereinEinzel = $('#vereinEinzel').val();
    	if (playerold <= controlerPlayer) {
    		fillSinglePlayerlist(nameEinzel, vornameEinzel, vereinEinzel);
    	};
    	startedplayer = startedplayer + 1;
   	});
   	$("#startTournament").click(function(){
   		activaTab('matches');
   		if (turnier == "ko"){
   			console.log(turnier+ " is not supported!")
   		}else if(turnier == "doppelko"){
   			startdoppelko();
   		}else if(turnier == "liga"){
   			console.log(turnier+ " is not supported!")
   		}else if(turnier == "schweitzer"){
   			console.log(turnier+ " is not supported!")
   		}else{
   			console.log(turnier+ " is not supported!")
   		}
   		
   		
   	});


});