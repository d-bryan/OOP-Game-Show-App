/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

// Variables
const startButton = document.getElementById('btn__reset');
const keyboard = document.querySelector('#qwerty');
const buttons = document.querySelectorAll('div.keyrow button');
const keyboardREGEX = /^[a-z]$/;
var game;
// add event listener for starting the game
startButton.addEventListener('click', () => {
    game = new Game();
    game.startGame();

});

// add CLICK event listener for keys and pass game function to this
keyboard.addEventListener('click', (e) => {
    // if target key classname === key proceed with game logic 
    if (e.target.className === 'key'){
        game.handleInteraction(e.target);
    }
});

// add KEYDOWN event listener for keys and pass game function to this
document.addEventListener('keydown', logKey);

/**
 * Handles the keyboard functions for the game
 * @param {Event} e - keydown event to pass through to handle interaction 
 */
function logKey(e) {
    let keyLetter = e.key.toLowerCase();
    buttons.forEach(button => {
        if (keyLetter === button.textContent && keyboardREGEX.test(keyLetter) && button.disabled !== true) {
            game.handleInteraction(button);
        }
    });     
}