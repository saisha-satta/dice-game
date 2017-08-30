/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// multiple variable declarations globally - gamePlaying is a state variable
var scores, roundScore, activePlayer, gamePlaying;

//call a new game
init();

// select the element btn-roll then add an event listener with anonymous function
document.querySelector('.btn-roll').addEventListener('click', function(){
    //if game is currently playing...
    if (gamePlaying) {
        //1. random number
        dice = Math.floor(Math.random() * 6) + 1;

        //2. display result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. update the round score if the number is not 1
        if (dice !== 1) {
            //add score
            //make dice the roundScore
            roundScore += dice;

            //now add roundScore to the DOM element
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }   
    }
});

//Hold Button
document.querySelector('.btn-hold').addEventListener('click', function(){
    //if game is currently playing...
    if (gamePlaying) {
        //add current score to Global score once the hold btn is clicked
        scores[activePlayer] += roundScore;

        //update UI once hold btn is clicked
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won game 
        if(scores[activePlayer] >= 20) {
            //display Winner instead of Player    
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            //hide dice
            document.querySelector('.dice').style.display = 'none';
            //add class winner to active player panel
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            //remove active class from winner panel
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            //game is no longer playing
            gamePlaying = false;
        } 
        //else next players turn
        else {
            nextPlayer();   
        }   
    }
});

function nextPlayer() {
    //next players turn 
        //turnary operator: if activePlayer is 0 make it 1 else make activePlayer 0
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        
        //set roundScore back to 0
        roundScore = 0;
        
        //set players current score back to 0
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        //make it obvious that its the next players turn
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        //hide the dice again for the next player
        document.querySelector('.dice').style.display = 'none';
};

//new game button is clicked, will call the init function
document.querySelector('.btn-new').addEventListener('click', init);

//to initialize a new game
function init() {
    //stores the scores for both players - player 1 is 0 and player 2 is 1
    scores = [0, 0];

    //stores round score
    roundScore = 0;

    //active player - player 1 is 0 and player 2 is 1
    activePlayer = 0; //first player begins
    
    //game is currently playing? set to true!
    gamePlaying = true;
    
    // initially hide dice img
    document.querySelector('.dice').style.display = 'none';

    // show scores at 0 initially
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    //display Player name instead of Winner
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    //remove the winner class from both players
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    //remove active class from both players    
    document.querySelector('.player-0-panel').classList.remove('active'); document.querySelector('.player-1-panel').classList.remove('active');
    
    //now add the active class to the first player because it was removed
    document.querySelector('.player-0-panel').classList.add('active');



};