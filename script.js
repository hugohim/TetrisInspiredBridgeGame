document.getElementById("usernameBtn").addEventListener("click", usernameSent);


document.addEventListener('keydown', keyEvent);

let gameBoard = [];
let spawnPoint = [];

function keyEvent(event) {
    if (event.key === ' ') {
       if (amountShapes>0) {
           placeShape(currentShape,currentX,currentY,'rgb(160, 82, 45)')
        }
        amountShapes++;
        event.preventDefault();  // Prevents the default action of the spacebar
        randomShape();
        if(!setSpawn()){
            alert("Game Over! You lost the game.");
        loadGame();
        }
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
    } else if (event.key === 'e') {
        rotateShapeRight();
    }
}

function spawnShapeLeftToRight(){
    for (let index = 0; index < gameBoard.length; index++) {
        for (let index2 = 0; index2 < gameBoard.at(index).length; index2++) {
            if (safeToPlaceShape(currentShape,index2,index)) {
                placeShape(currentShape, index2, index, 'darkorange');

                return true;
            }
        }
    }
    return false;
}

function setSpawn(){
    const randomX = Math.floor(Math.random() * 7) + 1;
    const randomY = Math.floor(Math.random() * 7) +1;
    spawnPoint[0] = randomX;
    spawnPoint[1] = randomY;

    //placeShape(shapes.o, randomX, randomY, 'darkgrey');
    placeShape(currentShape, randomX, randomY, 'darkorange');
    return true;

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



const shapes = {
    I: [
        [1, 1, 1, 0]
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
        [1, 0]
    ],
    x: [
        [1,0],
        [0,1]
    ],
    o:[
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
    amountShapes = 0;

    // Skapa spelplanen
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

    // Lägg till två gröna kuber på slumpmässiga positioner på vänster och höger sida
    placeRandomGreenCubes();
}

function placeRandomGreenCubes() {
    // Slumpa två positioner, en på vänster kolumn (x = 0) och en på höger kolumn (x = 8)
    const leftRandomY = Math.floor(Math.random() * 9);
    const rightRandomY = Math.floor(Math.random() * 9);
    
    // Placera de gröna kuberna på dessa positioner
    placeSingleBrick(0, leftRandomY, 'green'); // Vänster kolumn
    placeSingleBrick(8, rightRandomY, 'green'); // Höger kolumn
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
        gameBoard[y][x].style.backgroundColor = color;

}



function safeToPlaceSingleBrick(x, y) {
    if (gameBoard[y] && gameBoard[y][x] && x >= 0 && x < 9 && y >= 0 && y < 9) {
        // Use getComputedStyle to get the actual applied background color
        const backgroundColor = window.getComputedStyle(gameBoard[y][x]).backgroundColor;
        
        if (backgroundColor === 'rgb(170, 170, 170)' || backgroundColor === 'rgb(255, 140, 0)' || backgroundColor === 'darkgrey' ) {
            return true;
        }
    }
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

function rotateShapeRight() {
    // Ta bort formen från sin nuvarande position
    placeShape(currentShape, currentX, currentY, 'rgb(170, 170, 170)');

    // Rotera formen 90 grader medurs
    const rotatedShape = currentShape[0].map((_, index) => 
        currentShape.map(row => row[index]).reverse()
    );

    // Kontrollera om rotationen är säker
    if (safeToPlaceShape(rotatedShape, currentX, currentY)) {
        currentShape = rotatedShape;  // Använd den roterade formen om det är säkert
    }

    // Placera den roterade formen på spelplanen
    placeShape(currentShape, currentX, currentY, 'darkorange');
}





function test2(){
    moveBrickUp(currentX,currentY)
}

