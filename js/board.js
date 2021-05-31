var board = [['X', 'X', 'X'], ['X', 'X', 'X'], ['X', 'X', 'X']];
var playerProfile = [];
var outerBound = 3;
var currentPlayerId;
var playerProfile = [];
var totalSelection = 0;
var selectedProfile;
var playMode = false;
var selectMode = false;
var playerDrag = false;
var Flexbox = document.getElementById('Flexbox');
function prepareProfiles() {

    var p1 = {
        "id": '1',

        "color": '#1d3557',
        "name": 'Rakesh',
        "tag": 'Player 1',
        'dimColor': '#23416a'

    }

    playerProfile.push(p1);

    var p2 = {
        "id": '2',

        "color": '#e63946',
        "name": 'Roshan',
        "tag": 'Player 2',
        'dimColor': '#e9505b'

    }

    playerProfile.push(p2);
}






function logMessage(str) {
    var s = document.getElementById('logspace');
    str = "\n" + str;
    s.value = s.value + str;

}
function makeSelection(elementId) {

    var node = document.getElementById(elementId);
    node.style.backgroundColor = playerProfile[currentPlayerId - 1].color;
    board[parseInt(node.textContent.split(",")[0])][parseInt(node.textContent.split(",")[1])] = currentPlayerId;
}

function validateMove(elementA, elementB) {


    var elementAValue = elementA.textContent;
    var elementBValue = elementB.textContent;
    var fromx = parseInt(elementAValue.split(",")[0]);
    var fromy = parseInt(elementAValue.split(",")[1]);
    var from = board[fromx][fromy];
    var tox = parseInt(elementBValue.split(",")[0]);
    var toy = parseInt(elementBValue.split(",")[1]);
    var to = board[tox][toy];
    if (from == 'X') {
        logMessage("Movement from should be a valid non empty node");
    }
    else if (to != 'X') {
        logMessage("Movement to should be a valid empty node");
    }
    else if (Math.abs(fromx - tox) >= outerBound - 1 || Math.abs(fromy - toy) >= outerBound - 1) {
        logMessage("Movement distance too high");
    }
    else if (Math.abs(fromx - tox) == 1 && Math.abs(fromy - toy) == 1 && fromx == toy && fromy == tox) {
        logMessage("This Movement is not allowed");
    }
    else if ((Math.abs(fromx - fromy) * Math.abs(tox - toy)) == 1) {
        logMessage("This Movement may not allowed");
    }
    else if (currentPlayerId != from) {
        //currentplayerid should match the from

        logMessage("Movement from is not current players node");
    }
    else {
        logMessage("Valid move by Player " + currentPlayerId);

        return true;
    }
    return false;
}
function completionTest(playerid) {
    var markIndex = [];

    board.forEach((item, y) => {
        item.forEach((id, x) => {
            if (id == playerid)
                markIndex.push([x, y])
        });
    })

    if (markIndex.length != outerBound)
        return false

    collinearCheck = []
    for (i = 0; i < (outerBound - 1); i++) {
        x = markIndex[i + 1][0] - markIndex[i][0];
        y = markIndex[i + 1][1] - markIndex[i][1];
        collinearCheck.push([x, y]);
    }

    let completed = collinearCheck.filter(item => item[0] == collinearCheck[0][0] && item[1] == collinearCheck[0][1]).length == (outerBound - 1)
    return completed
}



function move(elementAId, elementBId) {
    //swap the properties of the dom element
    var elementA = document.getElementById(elementAId);
    var elementB = document.getElementById(elementBId);
    if (validateMove(elementA, elementB)) {
        var color = elementA.style.backgroundColor;
        elementA.style.backgroundColor = elementB.style.backgroundColor;
        elementB.style.backgroundColor = color;
        var elementAValue = elementA.textContent;
        var elementBValue = elementB.textContent;
        board[parseInt(elementAValue.split(",")[0])][parseInt(elementAValue.split(",")[1])] = 'X';
        board[parseInt(elementBValue.split(",")[0])][parseInt(elementBValue.split(",")[1])] = currentPlayerId;
        if (completionTest(currentPlayerId)) {
            alert("Winner - Player  " + currentPlayerId);
            logMessage("Winner - Player  " + currentPlayerId);
        }
        else {
            swapPlayer();
        }

    }


}

function matchId(id) {
    return playerProfile.id == id;
}
function getPlayerProfileForPlayerId(playerId) {
    playerProfile.find(matchId);
}
function swapPlayer() {
    if (currentPlayerId == 1) {
        currentPlayerId = 2;
        if (selectMode)
            logMessage("Player 2 to select the node");
        else
            logMessage("Player 2 to make the movement");
    }
    else {
        currentPlayerId = 1;
        if (selectMode)
            logMessage("Player 1 to select the node");
        else
            logMessage("Player 1 to make the movement");
    }

}

function validateSelection(elementId) {
    //validate if the node is selected by other player
    var node = document.getElementById(elementId);
    var nodeValue = node.textContent;
    var posx = parseInt(nodeValue.split(",")[0]);
    var posy = parseInt(nodeValue.split(",")[1]);
    var posValue = board[posx][posy];

    if (posValue != 'X') {
        logMessage("Node is already taken");
        return false;
    }
    return true;
}

function selectNode(e) {

    if (selectMode) {
        if (validateSelection(e.target.id)) {
            makeSelection(e.target.id);
            if (completionTest(currentPlayerId)) {
                alert("Winner - Player  " + currentPlayerId);
            }

            totalSelection++;
            if (totalSelection == 6) {
                logMessage("Node selection complete. Player 1 can make a move");
                playMode = true; selectMode = false;

            }
            swapPlayer();
        }
        else {
            logMessage("Player " + currentPlayerId + " to select the node");
        }
    }



}

function drawLines() {
    var start = "0,0";
    var end = `${outerBound - 1},${outerBound - 1}`
    var startNode = document.evaluate(`//div[text()='${start}']`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var endNode = document.evaluate(`//div[text()='${end}']`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    startRect = startNode.getBoundingClientRect();
    endRect = endNode.getBoundingClientRect();
    Flexbox.style.backgroundPositionX = startRect.left + 20 + "px";
    Flexbox.style.backgroundPositionY = startRect.top - 10 + "px";
    Flexbox.style.backgroundSize = (endRect.left - startRect.left) + "px " + (endRect.top - startRect.top) + "px";
}

drawLines()


function reportWindowSize() {
    drawLines()
}

window.onresize = reportWindowSize;

//Play

prepareProfiles();
logMessage("Player 1 to select the node");
currentPlayerId = 1; selectMode = true;