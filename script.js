document.getElementById("usernameBtn").addEventListener("click", usernameSent);


document.addEventListener('keydown', keyEvent);

function keyEvent(event) {
    if (event.key === ' ') {
        if (amountShapes>0) {
            placeShape(currentShape,currentX,currentY,'blue')
        }
        event.preventDefault();  // Prevents the default action of the spacebar
        randomShape();
        placeShape(currentShape, 4, 4, 'darkorange');
        amountShapes++;
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
        shape = currentShape;
        placeShape(shape, 4, 4, 'red');
    }
}


function usernameSent() {
    const usernameInput = document.getElementById('username').value;
    
   // if (usernameInput.trim() !== "") {
        // Hide the login section
        document.getElementById('login').style.display = 'none';

        // Display the new content section
        document.getElementById('gameContainer').style.display = 'flex';

        document.getElementById("accountName").textContent = usernameInput
        // (Optional) Log the username to the console
        console.log(usernameInput);
        loadGame();
   // } else {
       // alert("Please enter a username.");
   // }
}


let gameBoard = [];
const shapes = {
    I: [
        [1, 1, 1, 1]
    ],
    L: [
        [1, 0, 0],
        [1, 1, 1]
    ],
    T: [
        [0, 1, 0],
        [1, 1, 1]
    ],
    O: [
        [1, 1],
        [1, 1]
    ]
};
currentX = 0;
currentY = 0;
currentShape = shapes.L;
amountShapes = 0;

function loadGame() {
    const gameBoardElement = document.getElementById('gameContent');
    gameBoardElement.innerHTML = ''; // Rensa eventuellt befintligt innehåll
    gameBoard = []; // Nollställ gameBoard-arrayen

    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
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

function randomShape() {
    // Create an array of shape keys
    const shapeKeys = Object.keys(shapes);

    // Generate a random number between 0 and the length of the shapeKeys array
    const randomNumber = Math.floor(Math.random() * shapeKeys.length);

    // Set currentShape to a random shape using the random index
    currentShape = shapes[shapeKeys[randomNumber]];
}




function moveBrickUp(x, y) {

  tempx = x;
  tempy = y-1;
  
  if (safeToPlaceShape(currentShape,tempx,tempy)) {
      placeShape(currentShape,x,y,'rgb(170, 170, 170)');
      placeShape(currentShape,tempx, tempy, 'darkorange');
      currentX = tempx;
      currentY = tempy;
  }
}
function moveBrickDown(x, y) {

 tempx = x;
 tempy = y+1;
 
 if (safeToPlaceShape(currentShape,tempx,tempy)) {
     placeShape(currentShape,x,y,'rgb(170, 170, 170)');
     placeShape(currentShape,tempx, tempy, 'darkorange');
     currentX = tempx;
     currentY = tempy;
 }
}
function moveBrickLeft(x, y) {

 tempx = x-1;
 tempy = y;
 
 if (safeToPlaceShape(currentShape,tempx,tempy)) {
     placeShape(currentShape,x,y,'rgb(170, 170, 170)');
     placeShape(currentShape,tempx, tempy, 'darkorange');
     currentX = tempx;
     currentY = tempy;
 }
}

function moveBrickRight(x, y) {

    tempx = x+1;
    tempy = y;
    
    if (safeToPlaceShape(currentShape,tempx,tempy)) {
        placeShape(currentShape,x,y,'rgb(170, 170, 170)');
        placeShape(currentShape,tempx, tempy, 'darkorange');
        currentX = tempx;
        currentY = tempy;
    }
}

function testDrawRemovbe() {
    placeShape(currentShape,currentX, currentY, 'darkorange');
    placeShape(currentShape,currentX,currentY,'rgb(170, 170, 170)');
}


function placeShape(shape, startX, startY, color) {
    // First loop to check if placing is possible
    if(!safeToPlaceShape(shape,startX,startY)){
        console.log("cant place there")
        return;
    }
    // If placing is possible, proceed with placing the bricks
    for (let rowIndex = 0; rowIndex < shape.length; rowIndex++) {
        for (let colIndex = 0; colIndex < shape[rowIndex].length; colIndex++) {
            if (shape[rowIndex][colIndex] === 1) {
                placeSingleBrick(startX + colIndex, startY + rowIndex, color);
            }
        }
    }
    currentX = startX;
    currentY = startY;
}


// Exempel på hur man placerar en tegelsten i en specifik cell
function placeSingleBrick(x, y, color) {
    if (gameBoard[y] && gameBoard[y][x]) {
        gameBoard[y][x].style.backgroundColor = color;
    }
}



function safeToPlaceSingleBrick(x, y) {
    if (gameBoard[y] && gameBoard[y][x] && x >= 0 && x < 9 && y >= 0 && y < 9) {
        // Use getComputedStyle to get the actual applied background color
        const backgroundColor = window.getComputedStyle(gameBoard[y][x]).backgroundColor;
        console.log('Computed background color:', backgroundColor); // Debug output
        
        if (backgroundColor === 'rgb(170, 170, 170)' || backgroundColor === 'rgb(255, 140, 0)') {
            return true;
        }
    }
    console.log("Cannot place there");
    return false;
}


function safeToPlaceShape(shape, startX, startY){
    for (let rowIndex = 0; rowIndex < shape.length; rowIndex++) {
        for (let colIndex = 0; colIndex < shape[rowIndex].length; colIndex++) {
            if (shape[rowIndex][colIndex] === 1) {
                if (!safeToPlaceSingleBrick(startX + colIndex, startY + rowIndex)) {
                    return false; // Exit the function completely if placing fails
                }
            }
        }
    }
    return true;
}




function test2(){
    moveBrickUp(currentX,currentY)
}

