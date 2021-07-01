let invalidIPs = [];
let validDestinationIP = randomIP();
let validSourceIP = randomIP();
let portList = [23, 80, 443, 20, 21];

window.onload = function() {
	document.getElementById("score").innerHTML = 0;
	document.getElementById("lives").innerHTML = 3;
	document.getElementById("yourIP").innerHTML = validDestinationIP;
	for (let i = 0; i < 32; i++) {
		invalidIPs.push(randomIP());
	} 
	chooseIP();
};

function randomIP() {
	return (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255));
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
	if (score == 4) {
		document.getElementById("rule2").innerHTML = "Allow packets from ";
		document.getElementById("allowFrom").innerHTML = validSourceIP;
	}
}

function stage1check(button) {
	var destination = document.getElementById("destinationIP").innerHTML;
	if (destination == validDestinationIP && button == "allow") {
		return true;
	}
	else if (destination != validDestinationIP && button == "deny") {
		return true
	}
	else {
		return false
	}
}

function stage2check(button) {
	var destination = document.getElementById("destinationIP").innerHTML;
	var source = document.getElementById("sourceIP").innerHTML;
	if (destination == validDestinationIP && source == validSourceIP && button == 'allow') {
		return true;
	}
	else if ((destination != validDestinationIP || source != validSourceIP) && button == 'deny') {
		return true;
	}
	else {
		return false;
	}
}

function check(button) {
	var currentScore = document.getElementById("score").innerHTML;
	var newScore = document.getElementById("score").innerHTML;
	if (currentScore >= 5) {
		result = stage2check(button);
	}
	else {
		result = stage1check(button);
	}
	if (result) {
		newScore ++;
	}
	else {
		document.getElementById("lives").innerHTML --;
	}
	if (currentScore != newScore) {
		document.getElementById("score").innerHTML = newScore;
		chooseIP(currentScore);
	}
}