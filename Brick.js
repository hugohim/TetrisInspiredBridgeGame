class Brick {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.element = document.createElement('div'); // Skapa en div för varje tegelsten
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.classList.add('brick'); // Lägg till en klass för CSS-styling
    }

    // Metod för att placera tegelstenen på en viss position
    setPosition(x, y) {
        this.element.style.position = 'absolute';
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }

    // Lägg till tegelstenen i DOM
    addToBoard(board) {
        board.appendChild(this.element);
    }
}
