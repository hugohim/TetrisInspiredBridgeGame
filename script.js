document.getElementById("usernameBtn").addEventListener("click", usernameSent);
document.getElementById("testBtn").addEventListener("click", testfuck);
document.getElementById("testBtn2").addEventListener("click", test2)

document.addEventListener('keydown', keyEvent);

function keyEvent(event) {
    if (event.key === ' ') {
        event.preventDefault();  // Prevents the default action of the spacebar
        placeSingleBrick(0, 6, 'darkorange');
        console.log("yup");
    }
    // Handle Arrow keys
    if (event.key === 'ArrowDown' || event.key === 's') {
        moveBrickDown(currentX, currentY); // Arrow Down or 'S'
    } else if (event.key === 'ArrowUp' || event.key === 'w') {
        moveBrickUp(currentX, currentY); // Arrow Up or 'W'
    } else if (event.key === 'ArrowLeft' || event.key === 'a') {
        moveBrickLeft(currentX, currentY); // Arrow Left or 'A'
    } else if (event.key === 'ArrowRight' || event.key === 'd') {
        moveBrickRight(currentX, currentY); // Arrow Right or 'D'
    }else if(event.key === 'Space') {
         placeSingleBrick(0,6, 'darkorange');
    }
}


function usernameSent() {
    const usernameInput = document.getElementById('username').value;
    
    if (usernameInput.trim() !== "") {
        // Hide the login section
        document.getElementById('login').style.display = 'none';

        // Display the new content section
        document.getElementById('gameContainer').style.display = 'flex';

        document.getElementById("accountName").textContent = usernameInput
        // (Optional) Log the username to the console
        console.log(usernameInput);
        loadGame();
    } else {
        alert("Please enter a username.");
    }
}

let gameBoard = [];

function loadGame() {
    const gameBoardElement = document.getElementById('gameContent');
    gameBoardElement.innerHTML = ''; // Rensa eventuellt befintligt innehåll
    gameBoard = []; // Nollställ gameBoard-arrayen

    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            const box = document.createElement('div');
            box.className = 'box'; // Tilldela klassen till varje ruta
            
            // Lagra referensen till rutan i gameBoard-arrayen
            if (!gameBoard[row]) {
                gameBoard[row] = [];
            }
            gameBoard[row][column] = box;
            gameBoardElement.appendChild(box); // Lägg till rutan i spelplanen
        }
    }
}

currentX = 0;
currentY = 6;

// Exempel på hur man placerar en tegelsten i en specifik cell
function placeSingleBrick(x, y, color) {
    if (gameBoard[y] && gameBoard[y][x]) {
        gameBoard[y][x].style.backgroundColor = color;
        currentX = x;
        currentY = y;
    }
}
function undoBrick(x,y){
    if (gameBoard[y] && gameBoard[y][x]) {
        gameBoard[y][x].style.backgroundColor = '#aaa';
    }
}


function moveBrickUp(x, y) {
    // Kontrollera om vi kan flytta tegelstenen nedåt
    tempx = x;
    tempy = y-1;
    //console.log(checkIfOccupiedBox(tempx,tempy))
    if (y>0 && checkIfOccupiedBox(tempx,tempy)) {


        //Töm den nuvarande cellen
        undoBrick(x,y);
        y--;
        currentX = x;
        currentY = y;
        // Placera tegelstenen i den nya cellen
        placeSingleBrick(x, y, 'darkorange');
    
}
}
function moveBrickDown(x, y) {
    // Kontrollera om vi kan flytta tegelstenen nedåt
    tempx = x;
    tempy = y+1;
    if (y<7 && checkIfOccupiedBox(tempx,tempy)) {

        // Töm den nuvarande cellen
        undoBrick(x,y);
        y++;
        currentX = x;
        currentY = y;
        // Placera tegelstenen i den nya cellen
        placeSingleBrick(x, y, 'darkorange');
    }
}
function moveBrickLeft(x, y) {
    // Kontrollera om vi kan flytta tegelstenen nedåt
    tempx = x-1;
    tempy = y;
    if (x>0 && checkIfOccupiedBox(tempx,tempy)) {
        // Töm den nuvarande cellen
        undoBrick(x,y);
        x--;
        currentX = x;
        currentY = y;
        // Placera tegelstenen i den nya cellen
        placeSingleBrick(x, y, 'darkorange');
    }
}

function moveBrickRight(x, y) {
    // Kontrollera om vi kan flytta tegelstenen nedåt
    tempx = x+1;
    tempy = y;
    if (x<7 && checkIfOccupiedBox(tempx,tempy)) {

        // Töm den nuvarande cellen
        undoBrick(x,y);
        x++;
        currentX = x;
        currentY = y;
        placeSingleBrick(x, y, 'darkorange');
    }
}

function checkIfOccupiedBox(x, y) {
    // Ensure you're passing the right coordinates for the box
    const boxStyle = window.getComputedStyle(gameBoard[y][x]);

    // Get the background color of the box
    const backgroundColor = boxStyle.backgroundColor;

    //console.log(`Box at (${x}, ${y}) has color: ${backgroundColor}`);

    // Check if the background color is the default gray '#aaa' (rgb equivalent)
    if (backgroundColor === 'rgb(170, 170, 170)') {
        return true;
    }

    return false;
}


// Starta rörelsen nedåt med ett intervall

function testfuck(){
    placeSingleBrick(0,6, 'darkorange')
}

function test2(){
    moveBrickUp(currentX,currentY)
}

