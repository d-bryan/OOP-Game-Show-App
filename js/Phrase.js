/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {

    /** 
     * Constructor:
     * 
     * receives a phrase parameter and initializes the following properties:
     *  
     * @param {phrase} phrase - this is the actual phrase the Phrase object is representing. 
        This property should be set to the `phrase` parameter, but converted to all lower case.
     */ 
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    };
    

    /**
     * this adds letter placeholders to the display when the game starts. Each letter is presented by an empty box, one li element for each letter. 
     * 
     * When the player correctly guesses a letter, the empty box is replaced with the matched letter (see the `showMatchedLetter()` method below).
     */
    addPhraseToDisplay() {
        // get the unordered list item
        const UL = document.querySelector('#phrase ul');
        // loop over the current random generated phrase
        [...this.phrase].forEach(char => {
            const LI = document.createElement('li');
            UL.append(LI);
            // if char is a space add class respectively
            if (char === ' ') {
                LI.classList.add('space');
                LI.innerHTML = ' ';
            // if char is letter add respective classes with animations
            } else {
                LI.classList.add('hide', 'letter', 'animated', 'zoomInDown', `${char}`);
                LI.innerHTML = char;
            }
        });
    };

    /**
     * Checks if passed letter is in phrase
     * @param {string} letter - Letter to check
     */
    checkLetter(letter) {
        if (this.phrase.indexOf(letter) > -1) {
            return true;
        } else {
            return false;
        }
    };

    /**
     * Displays passed letter on screen after a match is found
     * @param {string} letter - Letter to display
     */
    showMatchedLetter(letter) {
        // find the matching letter
        let match = document.querySelectorAll(`.${letter}`);
        // switch the class from hide to show with animations
        match.forEach(group => {
            group.classList.remove('hide', 'zoomInDown');
            group.classList.add('show', 'animated', 'fadeInDown');
        });
    };
}