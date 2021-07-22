var portList = [23, 80, 443, 20, 21, 42, 111];
var amountOfTime = 121;
var invalidIPs = [];
var validDestinationIP = randomIP();
var validSourceIP = randomIP();
var validDestinationPort = get_random(portList);
removeItem(validDestinationPort)
var validSourcePort = get_random(portList);
removeItem(validSourcePort);

window.onload = function() {
	document.getElementById("healthBarText").innerHTML = 0;
	document.getElementById("yourIPText").innerHTML = "Your IP <br> " + validDestinationIP;
	for (var i = 0; i < 32; i++) {
		invalidIPs.push(randomIP());
	} 
	chooseIP(0);
	choosePort(0);
	document.getElementById("portrait").className = "packageEntrance";
};

function gameOver() {
	document.getElementById("warningTextDisplay").innerHTML = "GAME OVER"
}


function randomIP() {
	return (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255));
}

function removeItem(element) {
	const index = portList.indexOf(element);
	if (index > -1) {
		portList.splice(index, 1);
	}
}

function get_random (list) {
	return list[Math.floor((Math.random()*list.length))];
}

function chooseIP(score) {
	if (Math.random() < 0.5) {
		document.getElementById("destinationIP").innerHTML = validDestinationIP;
	}
	else {
		document.getElementById("destinationIP").innerHTML = get_random(invalidIPs)
	}
	if (Math.random() < 0.7) {
		document.getElementById("sourceIP").innerHTML = validSourceIP;
	}
	else {
		document.getElementById("sourceIP").innerHTML = get_random(invalidIPs);
	}
	if (score == 5) {
		document.getElementById("rule2").innerHTML = "Allow packets from ";
		document.getElementById("allowFrom").innerHTML = validSourceIP;
	}
}

function choosePort(score) {
	if (Math.random() < 0.5) {
		document.getElementById("sourcePort").innerHTML = validSourcePort;
	}
	else {
		document.getElementById("sourcePort").innerHTML = get_random(portList)
	}
	if (Math.random() < 0.7) {
		document.getElementById("destinationPort").innerHTML = validDestinationPort;
	}
	else {
		document.getElementById("destinationPort").innerHTML = get_random(portList);
	}
	if (score == 10) {
		document.getElementById("rule3").innerHTML = "Allow packets from the port ";
		document.getElementById("allowFromPort").innerHTML = validSourcePort;
	}
	if (score == 15) {
		document.getElementById("rule4").innerHTML = "Allow packets going to port ";
		document.getElementById("allowToPort").innerHTML = validDestinationPort;
	}
}

function animation(status) {
	var picList = ["BoxA", "BoxB", "BoxC", "BoxD"];
	var imgSource = get_random(picList);
	var className = "package" + status;
	setTimeout(function(){
		document.getElementById("portrait").className = className;
		setTimeout(function(){
			document.getElementById("box").src = "img/" + imgSource + ".png";
			document.getElementById("portrait").className = "packageEntrance";
		}, 350)
	}, 350)
}

function stage1check(button) {
	var destination = document.getElementById("destinationIP").innerHTML;
	if (destination == validDestinationIP && button == "allow") {
		animation("Accept")
		return true;
	}
	else if (destination != validDestinationIP && button == "deny") {
		animation("Deny")
		return true
	}
	else if (button == 'allow'){
		document.getElementById("warningTextDisplay").innerHTML = "Oh no! Something was fishy about that packet!";
		animation("Accept");
		return false;
	}
	else {
		document.getElementById("warningTextDisplay").innerHTML = "Oh no! That packet was valid!";
		animation('Deny');
		return false;
	}
}

function stage2check(button) {
	var destination = document.getElementById("destinationIP").innerHTML;
	var source = document.getElementById("sourceIP").innerHTML;
	if (destination == validDestinationIP && source == validSourceIP && button == 'allow') {
		animation("Accept")
		return true;
	}
	else if ((destination != validDestinationIP || source != validSourceIP) && button == 'deny') {
		animation("Deny")
		return true;
	}
	else if (button == 'allow'){
		document.getElementById("warningTextDisplay").innerHTML = "Oh no! Something was fishy about that packet!";
		animation("Accept");
		return false;
	}
	else {
		document.getElementById("warningTextDisplay").innerHTML = "Oh no! That packet was valid!";
		animation('Deny');
		return false;
	}
}

function stage3check(button) {
	var destinationIP = document.getElementById("destinationIP").innerHTML;
	var sourceIP = document.getElementById("sourceIP").innerHTML;
	var sourcePort = document.getElementById("sourcePort").innerHTML;
	if (destinationIP == validDestinationIP && sourceIP == validSourceIP && sourcePort == validSourcePort && button == 'allow') {
		animation("Accept")
		return true;
	}
	else if ((destinationIP != validDestinationIP || sourceIP != validSourceIP || sourcePort != validSourcePort) && button == 'deny') {
		animation("Deny")
		return true;
	}
	else if (button == 'allow'){
		document.getElementById("warningTextDisplay").innerHTML = "Oh no! Something was fishy about that packet!";
		animation("Accept");
		return false;
	}
	else {
		document.getElementById("warningTextDisplay").innerHTML = "Oh no! That packet was valid!";
		animation('Deny');
		return false;
	}
}

function stage4check(button) {
	var destinationIP = document.getElementById("destinationIP").innerHTML;
	var sourceIP = document.getElementById("sourceIP").innerHTML;
	var sourcePort = document.getElementById("sourcePort").innerHTML;
	var destinationPort = document.getElementById("destinationPort").innerHTML;
	if (destinationIP == validDestinationIP && sourceIP == validSourceIP && sourcePort == validSourcePort && destinationPort == validDestinationPort && button == 'allow') {
		animation("Accept")
		return true;
	}
	else if ((destinationIP != validDestinationIP || sourceIP != validSourceIP || sourcePort != validSourcePort || destinationPort != validDestinationPort) && button == 'deny') {
		animation("Deny")
		return true;
	}
	else if (button == 'allow'){
		document.getElementById("warningTextDisplay").innerHTML = "Oh no! Something was fishy about that packet!";
		animation("Accept");
		return false;
	}
	else {
		document.getElementById("warningTextDisplay").innerHTML = "Oh no! That packet was valid!";
		animation('Deny');
		return false;
	}
}

function healthChange(result) {
	var start = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--my-start-width').slice(0, -1));
	if (result) {
		var end_width = start + 10;
		document.documentElement.style.setProperty('--my-end-width', end_width + "%");
		document.getElementById("healthBar").className = "healthAlter";
	}
	else {
		var end_width = start - 10;
		document.documentElement.style.setProperty('--my-end-width', end_width + "%");
		document.getElementById("healthBar").className = "healthAlter";
	}
	if (end_width <= 15) {
		document.getElementById("healthBar").style.backgroundColor = "red";
	}
	else if (end_width <= 45) {
		document.getElementById("healthBar").style.backgroundColor = "yellow";
	}
	else {
		document.getElementById("healthBar").style.backgroundColor = "lime";
	}
	setTimeout(function(){
		if (end_width > 0) {
			document.getElementById("healthBar").className = "";
			document.getElementById("healthBar").style.width = end_width + "%";
			document.documentElement.style.setProperty('--my-start-width', end_width + "%");
		}
		else {
			document.getElementById("healthBar").style.width = end_width + "%";
			document.getElementById("healthBarText").innerHTML = "";
			gameOver();
		}
	}, 350)
}

function check(button) {
	currentScore = document.getElementById("healthBarText").innerHTML
	if (currentScore >= 15) {
		result = stage4check(button)
	}
	else if (currentScore >= 10) {
		result = stage3check(button)
	}
	else if (currentScore >= 5) {
		result = stage2check(button);
	}
	else {
		result = stage1check(button);
	}
	if (result) {
		document.getElementById("warningTextDisplay").innerHTML = "";
		currentScore ++;
		healthChange(result);
	}
	else {
		healthChange(result);
	}
	setTimeout(function() {
		chooseIP(currentScore);
		choosePort(currentScore);
	}, 350)
	document.getElementById("healthBarText").innerHTML = currentScore;
}