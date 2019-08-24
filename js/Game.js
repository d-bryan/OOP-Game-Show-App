/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {

    /**
     * Constructor:
     * 
     * @property {missed} missed - used to track the number of missed guesses by the player. The initial value is `0`, since no guesses have been made at the   start of the game.
     * @property {phrases} phrases - an array of nine Phrase objects to use with the game. A phrase should only include letters and spaces— no numbers,       punctuation or other special characters.
     * @property {activePhrase} activePhrase - This is the Phrase object that’s currently in play. The initial value is `null`. Within the `startGame()` method, this property will be set to the Phrase object returned from a call to the getRandomPhrase() method.
     */
    constructor() {
        this.missed = 0;
        this.activePhrase = null;
        this.phrases = [
            new Phrase ('Mac is better'),
            new Phrase('Coding is Awesome'),
            new Phrase('Dont Sell your soul'),
            new Phrase('To the moon and back'),
            new Phrase('On the dancefloor'),
            new Phrase('Its about the journey'),
            new Phrase('Take me home tonight'),
            new Phrase('Full Stack Javascript'),
            new Phrase('America runs on Bacon')
        ];
    };

    /**
     * hides the start screen overlay, calls the `getRandomPhrase()` method, and sets the activePhrase property with the chosen phrase.
     *  
     * It also adds that phrase to the board by calling the `addPhraseToDisplay()` method on the active Phrase object.
     */
    startGame() {
        // hide the start screen overlay
        document.querySelector('#overlay').style.display = 'none';

        // set active phrase to random phrase
        this.activePhrase = this.getRandomPhrase();
        // add the phrase to the display
        this.activePhrase.addPhraseToDisplay();
    };

    /**
     * this method randomly retrieves one of the phrases stored in the phrases array and returns it.
     * 
     * * Selects random phrase from phrases property
     * @return {Object} Phrase object chosen to be used
     */
    getRandomPhrase(phrase) {
        // generate random number
        const randomNumber = () => {
            return Math.floor(Math.random() * this.phrases.length);
        }

        // Get random phrase from phrases array
        const randomPhrase = (number) => {
            number = randomNumber();    
            return this.phrases[number];
        }
        
        // return the phrase
        phrase = randomPhrase();
        return phrase;
    };

    /**
     * this method controls most of the game logic. It checks to see if the button clicked by the player matches a letter in the phrase, and then directs the game based on a correct or incorrect guess. 
     * 
     * This method should:
     *  - Disable the selected letter’s onscreen keyboard button.
     *  - If the phrase does not include the guessed letter, add the wrong CSS class to the selected letter's keyboard button and call the `removeLife()` method.
     *  - If the phrase includes the guessed letter, add the chosen CSS class to the selected letter's keyboard button, call the `showMatchedLetter()` method on the phrase, and then call the `checkForWin()` method. If the player has won the game, also call the `gameOver()` method.
     * 
     * Handles onscreen keyboard button clicks
     * @param {HTMLButtonElement} button - The clicked button element
     */
    handleInteraction(button) {
        // disbaled upon click
        // console.log(button);
        button.disabled = true;

        // if the phrase's current letter clicked === true
        if (this.activePhrase.checkLetter(button.textContent)) {
            this.activePhrase.showMatchedLetter(button.textContent);
            button.classList.add('chosen', 'animated', 'flipInX'); 
            // if the player has won the game pass true to gameOver method 
            if (this.checkForWin() === true) {
                this.gameOver(true);
            }
        // else add wrong class and continue the game
        } else {
            button.classList.add('wrong', 'animated', 'flipInX');
            this.removeLife();
            this.checkForWin();
        }
    };

    /**
     * - Increases the value of the missed property
     * - Removes a life from the scoreboard
     * - Checks if player has remaining lives and ends game if player is out
     */
    removeLife() {
        // select the heart images to change
        const score = document.querySelectorAll('#scoreboard ol li img');
        // change the current life to a lost life and add one to missed
        score[this.missed].setAttribute('src', 'images/lostHeart.png');
        this.missed += 1;
        // if missed guesses equals max lives end game
        if(this.missed === 5) {
            this.gameOver(false);
        }
    };

    /**
     * Checks for winning move
     * @return {boolean} True if game has been won, false if game wasn't won
     */
    checkForWin() {
        // checks to see if all the classes of hide have been removed
        if (document.querySelectorAll('.hide').length === 0) {
            return true;
        } else {
            return false;
        }
    };

    /**
     * Displays game over message
     * @param {boolean} gameWon - Whether or not the user won the game
     */
    gameOver(gameWon) {
        const buttonElements = document.querySelectorAll('div.keyrow button');
        const gameOverlay = document.getElementById('overlay');
        const endMessage = document.getElementById('game-over-message');
        const title = document.querySelector('#overlay h2.title');
        const button = document.getElementById('btn__reset');
        const listItems = document.querySelectorAll('#phrase ul li');

        if (gameWon === true) {
            // add win | remove lose + start class
            gameOverlay.style.display = 'flex'
            gameOverlay.classList.remove('lose', 'start');
            gameOverlay.classList.add('win');
            // add display style and ending message
            title.style.display = 'block';
            title.textContent = 'Phrase Hunter';
            button.style.display = 'inline-block';
            button.textContent = 'Play Again?';
            endMessage.innerHTML = 'Congratulations You Won!';
            endMessage.style.display = 'block';
            // remove list item classes
            listItems.forEach(name => name.className = '');
            // temporarily disable buttons and rename class to 'key'
            buttonElements.forEach(button => {
                button.disabled = true;
                button.className = 'key';
            });
            // reset the game if the button is clicked
            button.onclick = () => {
                game.resetGame();
            };
        } else {
            // add lose | remove win + start class
            gameOverlay.style.display = 'flex'
            gameOverlay.classList.remove('win', 'start');
            gameOverlay.classList.add('lose');
            // add display style and ending message
            title.style.display = 'block';
            title.textContent = 'Better Luck Next Time!';
            button.style.display = 'inline-block';
            button.textContent = 'Try Again?';
            endMessage.style.display = 'block';
            endMessage.innerHTML = `The correct answer was: 
                ${this.activePhrase.phrase.slice(0,1).toUpperCase() + this.activePhrase.phrase.slice(1)}`;
            // remove list item classes
            listItems.forEach(name => name.className = '');
            // temporarily disable buttons and rename class to 'key'
            buttonElements.forEach(button => {
                button.disabled = true;
                button.className = 'key';
            });
            // reset the game if the button is clicked
            button.onclick = () => {
                game.resetGame();
            };
        }
    };

    resetGame() {
        // get list items | key elements | button elements
        const listItems = document.querySelectorAll('#phrase ul li');
        const buttons = document.querySelectorAll('div.keyrow button');
        const getImg = document.querySelectorAll('li.tries img');
        // remove list items from the board
        listItems.forEach(item => item.remove());
        // enable all the button elements
        buttons.forEach(button => button.disabled = false);
        // reset heart images
        getImg.forEach(life => life.setAttribute('src', 'images/liveHeart.png'));
        // reset active phrase
        this.activePhrase = this.getRandomPhrase();
        // add phrase to display
        this.activePhrase.addPhraseToDisplay();
    };
};