'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let correctLetterLocations = 0
let correctLetters = 0
let guess = ''
let turnCounter = 0

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  //This resets solution each game
  solution = ''
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}


const generateHint = (guess) =>{

  var solutionArray = solution.split('');
  var guessArray = guess.split('');

  correctLetters = 0
  correctLetterLocations = 0
  
 for (let i = 0; i < solutionArray.length; i++){
     if (solutionArray[i] === guessArray[i]){

         correctLetterLocations = correctLetterLocations + 1

         guessArray[i] = "q"
         solutionArray[i] = null
     }
 }

 for (let i = 0; i < solutionArray.length; i++){
  let correctIndex = solutionArray.indexOf(guessArray[i])
  if (correctIndex > -1){

    solutionArray[correctIndex] = null
    correctLetters = correctLetters + 1
  }
 }
turnCounter = turnCounter + 1
console.log(`Amount of turns: ${turnCounter}`)
 console.log(`You guessed ${correctLetterLocations} right letter positions and ${correctLetters} right letter with wrong positions`)

 return (`${correctLetterLocations}-${correctLetters}`)
}
const mastermind = (guess) => {

  generateHint(guess)

  if (correctLetterLocations === 4){

    console.log("Game won!")

    return "Game won!"

  } else if (turnCounter === 10){

    console.log("Game lost!")
    console.log(`The correct answer was: ${solution}`)

    generateSolution()
    turnCounter = 0

  } 

}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}