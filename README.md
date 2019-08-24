# OOP-Game-Show-App

## Grade Expectations

My goal is to exceed expectations for this project based on the requirements listed below.

## Customizations Added

I added custom CSS animations from the provided `animate.css` package provided in the project files.

    - Every time a new game starts the phrases drops down onto the screen
    - The character are revealed by a fading out and droping down transition
    - The keyboard classes are add with a flip in animation

I decided upon these animation choices for a smooth look for the game, and left the colors what they were because I liked the blend they had.

There are also custom messages depending on whether you win/lose the game and the buttons at the end say "Play again?" for a winning game or "Try again?" for a losing game and if the game was lost then the phrase was displayed.

Also I put 9 phrases into the game because through testing I continued to know the answers so I would put more in as I was going. 

## Phrase Class

### Meets Expectations (Exceeds Expectations N/A)

Includes constructor that receives a phrase parameter and initializes a phrase property set to the phrase

Includes `addPhraseToDisplay()` method which adds the phrase to the gameboard

Includes `checkLetter()` method which checks if a letter is in the phrase

Includes `showMatchedLetter()` method which reveals the letter(s) on the board that matches the player's selection

## Game Class Constructor

### Meets Expectations (Exceeds Expectations N/A)

Includes a constructor that initializes a missed property set to 0, a phrases property set to an array of five Phrase objects, and an activePhrase property set to null initially

Phrases added to the game only include letters and spaces

## Game Class Methods

### Meets Expectations (Exceeds Expectations N/A)

Includes `startGame()` method that hides the start screen overlay, sets the activePhrase property to a random phrase, and calls the `addPhraseToDisplay()` method on the active phrase

Includes getRandomPhrase() method that randomly retrieves one phrase from the phrases array

Includes `handleInteraction()` method that:

-   Disables the selected letter's onscreen keyboard button
-   If the phrase does not include the guessed letter, the wrong CSS class is added to the selected letter's keyboard        button and the `removeLife()` method is called
-   If the phrase includes the guessed letter, the chosen CSS class is added to the selected letter's keyboard button,       the showMatchedLetter() method is called on the phrase, and the `checkForWin()` method is called. If the player has        won the game, the `gameOver()` method is called

Includes `checkForWin()` method that checks if the player has revealed all of the letters in the active phrase

Includes a `removeLife()` method that removes a life from the scoreboard (one of the liveHeart.png images is replaced with a lostHeart.png image), increments the missed property, and if the player has lost the game calls the `gameOver()` method

Includes gameOver() method that displays a final "win" or "loss" message by showing the original start screen overlay styled with either the win or lose CSS class

## app.js

### Meets Expectations

Clicking the "Start Game" button creates a new Game object and starts the game

Clicking an onscreen keyboard button results in a call to the `handleInteraction()` method for the clicked keyboard button

Clicking the spaces between and around the onscreen keyboard buttons does not result in the `handleInteraction()` method being called

### Exceeds Expectations

Event listener has been added for the keydown or keyup event so that pressing a physical keyboard button results in the `handleInteraction()` method being called for the associated onscreen keyboard button

## Resetting the Gameboard

### Meets Expectations (Exceeds Expectations N/A)

After a game is completed, the gameboard is reset so that clicking the "Start Game" button loads a new game

## HTML and CSS

### Meets Expectations

Provided HTML and CSS is used

### Exceeds Expectations

App styles have been personalized and changes have been noted in the README.md file and the project submission notes